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
  model_name,
}: {
  training_status: TGeneratedModelTrainingStatus;
  training_time?: TGeneratedModelTrainingTime;
  version?: string;
  userId: string;
  model_name: string;
}) {
  if (!training_time || !version) {
    await supabaseAdminClient
      .from("models")
      .update({
        training_status,
      })
      .eq("user_id", userId)
      .eq("model_name", model_name);

      return 
  }
  
  await supabaseAdminClient
    .from("models")
    .update({
      training_status,
      training_time,
      version,
    })
    .eq("user_id", userId)
    .eq("model_name", model_name);
}

export async function DeleteTrainingDataFromS3Bucket(filePath: string) {
  await supabaseAdminClient.storage.from("training_data").remove([filePath]);
}
