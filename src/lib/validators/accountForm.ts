import { z } from "zod";

export type TAccountFormValidator = z.infer<typeof AccountFormValidator>

export const AccountFormValidator = z.object({
    fullName: z.string(),
    email: z.string() 
})