import { z } from "zod";

export const postUserRegistrationLambdaLambdaSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email()
      .min(1, "Email can't be empty"),
    firstName: z.string().min(1, "First name can't be empty"),
    lastName: z.string().min(1, "Last name can't be empty"),
  }),
});

export type PostUserRegistrationLambdaLambdaPayload = z.infer<typeof postUserRegistrationLambdaLambdaSchema>;
