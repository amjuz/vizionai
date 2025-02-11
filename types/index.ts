import { Database } from "./database.types";

export type TGeneratedImageID =
  Database["public"]["Tables"]["generated_images"]["Row"]["id"];

export type TGeneratedImageName =
  Database["public"]["Tables"]["generated_images"]["Row"]["image_name"];

export type TGeneratedModelTrainingStatus =
  Database["public"]["Tables"]["models"]["Row"]["training_status"];

export type TGeneratedModelTrainingTime =
  Database["public"]["Tables"]["models"]["Row"]["training_time"];

export type Table = Database['public']['Tables']

export type Product = Table['products']['Row'] 

export type Price = Table['prices']['Row'] 

export type Subscription = Table['subscriptions']['Row'] 
