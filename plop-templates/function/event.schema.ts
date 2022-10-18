import { object, string } from "yup";
import { YupValidatorSchema } from "../../shared/middleware/yup-validator";

export const schema: YupValidatorSchema = {
  query: object({
    exampleParam: string().required(),
  }),
};
