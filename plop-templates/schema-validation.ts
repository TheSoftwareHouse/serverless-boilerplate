import * as joi from "@hapi/joi";

export const exampleSchemaValidation = joi.object({
  exampleParam: joi.string().required(),
});
