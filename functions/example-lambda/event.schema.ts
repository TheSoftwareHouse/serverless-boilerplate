import joi from "joi";
import { JoiValidatorSchema } from "../../shared/middleware/joi-validator";

export const schema: JoiValidatorSchema = {
  query: joi.object().keys({
    exampleParam: joi.string().required(),
  }),
};
