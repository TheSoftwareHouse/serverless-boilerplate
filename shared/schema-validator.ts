import { AnySchema } from "yup";

export const createSchemaValidator = <T extends AnySchema>(schema: T) => {
  return (input: unknown) => {
    return schema.validateSync(input);
  };
};
