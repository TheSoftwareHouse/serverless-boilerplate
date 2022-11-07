import { z } from "zod";

export const exampleLambdaSchema = z.object({
  queryStringParameters: z.object({
    exampleParam: z
      .string({
        required_error: "exampleParam is required",
      })
      .min(1, "exampleParam can't be empty"),
  }),
});

export type ExampleLambdaPayload = z.infer<typeof exampleLambdaSchema>;
