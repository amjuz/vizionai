import { z } from "zod";

export type TUpdateNameFormValidator = z.infer<typeof UpdateNameFormValidator>;

export const UpdateNameFormValidator = z.object({
  fullName: z.string(),
  email: z.string(),
});
