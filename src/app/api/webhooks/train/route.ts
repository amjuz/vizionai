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
import { error } from "console";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(
      "---------------------------STARTING WEBHOOK-----------------------------------"
    );
    console.log("received webhook model training status: ", body.status);

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId") ?? "";
    const modelId = url.searchParams.get("modelId") ?? "";
    const fileName = url.searchParams.get("fileName") ?? "";

    console.log("----------", "/n", "received url params :-", url.searchParams);
    // validate the webhook
    const isValid = await validateWebhookSignature({ request, body });
    // console.log(isValid);

    if (!isValid) {
      console.log(
        "Signature validation failed. Closing the request, status: FAILED"
      );

      return new NextResponse("Invalid signature", { status: 401 });
    }

    console.log(
      "Signature validation successful. Fetching user details from database ...."
    );
    const { data: user, error: userError } =
      await supabaseAdminClient.auth.admin.getUserById(userId);

    if (!user || userError) {
      console.log(
        "Database failed to send userdata, message : ",
        userError?.message
      );

      return new NextResponse("User not found", { status: 401 });
    }

    const userEmail = user.user.email;
    const userName = user.user.user_metadata.full_name;

    console.log("Received user details :", {
      email: userEmail,
      name: userName ?? "name",
    });

    if (!userEmail) {
      console.log(
        "Failed to complete request as received data contains empty values "
      );

      return new NextResponse("Failed to retrieve user name or email", {
        status: 401,
      });
    }

    console.log("Checking body status:", body.status);

    if (body.status === "succeeded") {
      console.log(
        "Received status contains success,Initiating email response and update db model status"
      );

      await Promise.all([
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
          modelId: modelId,
        }),
      ]);
    } else {
      // handle the failed and cancelled status
      console.log(
        "Received status doesn't contains success,Initiating email response and update db model status"
      );

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
          modelId: modelId,
        }),
      ]);
    }
    // delete training data from s3bucket

    console.log("Deleting training data from S3...");

    await DeleteTrainingDataFromS3Bucket(`${fileName}`);

    console.log("webhook worked fine", modelId);

    console.log("Closing connection");

    console.log(
      "---------------------------END WEBHOOK-----------------------------------"
    );

    return new NextResponse("Ok", { status: 200 });
  } catch (error) {
    console.log("Webhook processing error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
