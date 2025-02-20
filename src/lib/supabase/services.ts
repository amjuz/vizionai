import {
  TGeneratedModelTrainingStatus,
  TGeneratedModelTrainingTime,
} from "@/types/index";
import { supabaseAdminClient } from "./admin";

export async function updateModelStatus({
  training_status,
  training_time,
  version,
  userId,
  modelId,
}: {
  training_status: TGeneratedModelTrainingStatus;
  training_time?: TGeneratedModelTrainingTime;
  version?: string;
  userId: string;
  modelId: string;
}) {
  if (!training_time || !version) {
    // console.log(
    //   "reached inside first First try block of updating status model"
    // );

    try {
      const { data, error } = await supabaseAdminClient
        .from("models")
        .update({
          training_status,
        })
        .eq("user_id", userId)
        .eq("model_id", modelId);

      if (error) {
        console.log("Failed to update model status in database", error);
      } else if (data) {
        console.log("update model status successful", data);
      }
      return;
    } catch (error) {
      console.log("Something went wrong", error);
      return;
    }
  }

  // console.log("skipped First try block of updating status model");
  try {
    const { error } = await supabaseAdminClient
      .from("models")
      .update({
        training_status,
        training_time,
        version,
      })
      .eq("user_id", userId)
      .eq("model_id", modelId);

    if (error) {
      throw new Error("Failed to update model status in database", error);
    }
    //  else if (data) {
    //   console.log("update model status successful", data);
    // }

    return;
  } catch (error) {
    console.log('update model failed',error);
    
    throw new Error("Something went wrong while updating model training status")
  }
}

export async function DeleteTrainingDataFromS3Bucket(filePath: string) {
  const { data, error } = await supabaseAdminClient.storage
    .from("training_data_bucket")
    .remove([filePath]);

  if (error) {
    console.log("Failed to delete data from s3 ", error);
  } else if (data) {
    console.log("Delete complete");
  }
  return;
}
