import { z } from "zod";

export const ACCEPTED_ZIP_FILE = ['application/x-zip-compressed', 'application/zip']
export const MAX_FILE_SIZE = 45*1024*1024
export const GenderType = ["male", "female"] as const;

export const TrainModelValidator = z.object({
  modelName: z.string({ required_error: "Model name is required" }),
  gender: z.enum(GenderType),
  zipFile: z
    .any()
    .refine(
      (files) => files?.[0] instanceof File,
      "Please select a valid file"
    )
    .refine(files => files?.[0]?.type && ACCEPTED_ZIP_FILE.includes(files?.[0]?.type),"only zip files are accepted")
    .refine(files=> files?.[0]?.size <= MAX_FILE_SIZE, "Max file size allowed is 45 MB"), // 45 MB
});
