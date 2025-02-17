import { Database } from "./database.types";

export type TGeneratedImageID =
  Database["public"]["Tables"]["generated_images"]["Row"]["id"];

export type TGeneratedImageName =
  Database["public"]["Tables"]["generated_images"]["Row"]["image_name"];

export type TGeneratedModelTrainingStatus =
  Database["public"]["Tables"]["models"]["Row"]["training_status"];

export type TGeneratedModelTrainingTime =
  Database["public"]["Tables"]["models"]["Row"]["training_time"];

