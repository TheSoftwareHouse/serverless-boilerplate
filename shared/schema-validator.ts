import Joi from "@hapi/joi";

export const createSchemaValidator = (schema: Joi.ObjectSchema) => {
  return (input: any) => {
    return Joi.attempt(input, schema);
  };
};
