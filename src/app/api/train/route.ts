import { supabaseAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const DOMAIN = process.env.DOMAIN;

async function validateUserCredits({ userId }: { userId: string }) {
  const { data: userCredits, error } = await supabaseAdminClient
    .from("credits")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error("Error getting user credits");
  }

  const credits = userCredits.model_training_count ?? 0;

  if (credits <= 0) {
    throw new Error("No credits left for training");
  }
  return credits;
}

export async function POST(request: NextRequest) {
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
      // useFileOutput: false,
    });

    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("The replicate api token is not set!");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const formData = await request.formData();

    const input = {
      fileKey: formData.get("fileKey") as string,
      modelName: formData.get("modelName") as string,
      gender: formData.get("gender") as string,
    };

    if (!input.fileKey || !input.modelName) {
      return NextResponse.json(
        {
          error: "Missing required fields!",
        },
        { status: 400 },
      );
    }

    const oldCredits = await validateUserCredits({ userId: user.id });

    const fileName = input.fileKey.replace("training_data_bucket/", "");
    const { data: fileUrl } = await supabaseAdminClient.storage
      .from("training_data_bucket")
      .createSignedUrl(fileName, 3600);

    if (!fileUrl?.signedUrl) throw new Error("Failed to get the file URL");

    console.log(fileUrl);

    // AVAILABLE HARDWARE LIST
    // const hardware = await replicate.hardware.list()
    // console.log(hardware);

    const modelId = `${user.id}_${Date.now()}_${input.modelName
      .toLowerCase()
      .replaceAll(" ", "_")}`;

    // create model
    await replicate.models.create("amjuz", modelId, {
      visibility: "private",
      hardware: "gpu-a100-large",
    });

    // start training
    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "b6af14222e6bd9be257cbc1ea4afda3cd0503e1133083b9d1de0364d8568e6ef",
      {
        destination: `amjuz/${modelId}`,
        input: {
          steps: 1200,
          resolution: "1024",
          input_images: fileUrl.signedUrl,
          trigger_word: "ohwx",
        },
        webhook: `${DOMAIN}/api/webhooks/train?userId=${
          user.id
        }&modelId=${encodeURIComponent(modelId)}&fileName=${encodeURIComponent(
          fileName,
        )}`,
        webhook_events_filter: ["start", "completed"],
      },
    );

    if (training.error) {
      return NextResponse.json({
        error: "Failed to train model, Try again later!",
      });
    }
    // console.log("training", training);
    const { error } = await supabaseAdminClient
      .from("models")
      // @ts-expect-error  typescript inference error
      .insert({
        model_id: modelId,
        user_id: user.id,
        model_name: input.modelName,
        gender: input.gender,
        training_status: training.status,
        trigger_word: "ohwx",
        training_steps: 1200,
        training_id: training.id,
        // version: training.version,
      });

    if (error) {
      throw new Error(
        "Model training started but failed to store model! Please wait while we resolve the issue, you'r model will be stored as soon as possible",
      );
    }

    // update credits

    const { error: UpdateCreditsError } = await supabaseAdminClient
      .from("credits")
      .update({ model_training_count: oldCredits - 1 })
      .eq("user_id", user.id);

    if (UpdateCreditsError) {
      throw new Error("Failed to update credits for model training");
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Training Error:", error);

    // figure out replicate api error and handle the error accordingly
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to start the model training";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
