import joi from "joi";

export const schema = joi.object({
  exampleParam: joi.string().required(),
});
