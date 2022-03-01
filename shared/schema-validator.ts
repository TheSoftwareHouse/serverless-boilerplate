import Joi from "joi";

export const createSchemaValidator = (schema: Joi.ObjectSchema) => (input: any) => Joi.attempt(input, schema);
