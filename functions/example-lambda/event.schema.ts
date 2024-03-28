import { z } from "zod";

export const exampleLambdaSchema = z.object({
  queryStringParameters: z.object({
    exampleParam: z
      .string({
        required_error: "exampleParam is required",
      })
      .min(1, "exampleParam can't be empty"),
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.record(z.string()).optional(),
    filter: z.record(z.string()).optional(),
    search: z.string().optional(),
  }),
});

export type ExampleLambdaPayload = z.infer<typeof exampleLambdaSchema>;
