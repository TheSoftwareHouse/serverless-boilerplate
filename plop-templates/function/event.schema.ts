import joi from "joi";

export const exampleSchemaValidation = joi.object({
  exampleParam: joi.string().required(),
});
