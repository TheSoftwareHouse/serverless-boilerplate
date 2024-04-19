import { z } from "zod";

export const meLambdaSchema = z.object({
  queryStringParameters: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email()
      .min(1, "Email can't be empty"),
  }),
});

export type MeLambdaPayload = z.infer<typeof meLambdaSchema>;
