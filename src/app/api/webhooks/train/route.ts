import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import crypto from "crypto";
import { validateWebhookSignature } from "@/lib/services/replicate";
import { supabaseAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/services/resend";
import { TrainingStatusEmailTemplate } from "@/components/email-templates/training-status-email-template";
import {
  DeleteTrainingDataFromS3Bucket,
  updateModelStatus,
} from "@/lib/supabase/services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId") ?? "";
    const modelName = url.searchParams.get("ModelName") ?? "";
    const fileName = url.searchParams.get("fileName") ?? "";

    // validate the webhook
    const isValid = await validateWebhookSignature({ request });
    // console.log(isValid);

    if (!isValid) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const { data: user, error: userError } =
      await supabaseAdminClient.auth.admin.getUserById(userId);

    if (!user || userError) {
      return new NextResponse("User not found", { status: 401 });
    }

    const userEmail = user.user.email;
    const userName = user.user.user_metadata.full_name;

    if (!userEmail || !userName) {
      return new NextResponse("Failed to retrieve user name or email", {
        status: 401,
      });
    }

    if (body.status === "succeeded") {
      Promise.all([
        // send a successful status email
        sendEmail({
          emailTemplate: TrainingStatusEmailTemplate({
            userName,
            message: `Model Training completed`,
          }),
          to: [userEmail],
          subject: `Your model training has been completed!`,
        }),

        // update the supabase model table
        updateModelStatus({
          training_status: body.status,
          training_time: body.metrics?.total_time ?? null,
          version: body.output?.version.split(":")[1] ?? null,
          userId,
          model_name: modelName,
        }),
      ]);
    } else {
      // handle the failed and cancelled status

      await Promise.all([
        // send a training status email

        sendEmail({
          emailTemplate: TrainingStatusEmailTemplate({
            userName,
            message: `Model Training ${body.status}`,
          }),
          to: [userEmail],
          subject: `Your model training has been ${body.status}`,
        }),

        // update the supabase model table
        updateModelStatus({
          training_status: body.status,
          userId,
          model_name: modelName,
        }),
      ]);
    }
    // delete training data from s3bucket

    await DeleteTrainingDataFromS3Bucket(`${fileName}`);

    console.log("webhook worked fine", modelName);

    return new NextResponse("Ok", { status: 200 });
  } catch (error) {
    console.log("Webhook processing error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
