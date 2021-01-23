import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import Joi from "joi";

export type MiddlewareObject<T, U> = middy.MiddlewareObject<T, U>;

export const validateQuery = (schema: Joi.AnySchema): MiddlewareObject<APIGatewayEvent, APIGatewayProxyResult> => ({
  before: (handler, next) => {
    const query = handler.event.queryStringParameters;
    const { error, value } = schema.validate(query, { abortEarly: false });

    if (error) {
      throw error;
    }

    handler.event.queryStringParameters = {
      ...handler.event.queryStringParameters,
      ...value,
    };

    return next();
  },
});
