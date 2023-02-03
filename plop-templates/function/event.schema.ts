import { z } from "zod";

export const {{camelCase name}}LambdaSchema = z.object({
  queryStringParameters: z.object({
    exampleParam: z
      .string({
        required_error: "exampleParam is required",
      })
      .min(1, "exampleParam can't be empty"),
  }),
});

export type {{pascalCase name}}LambdaPayload = z.infer<typeof {{camelCase name}}LambdaSchema>;
