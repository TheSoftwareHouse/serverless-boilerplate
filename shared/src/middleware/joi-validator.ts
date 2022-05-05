import middy from "@middy/core";
import Joi from "joi";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../errors/http.error";

export interface JoiValidatorSchema {
  headers?: Joi.AnySchema;
  body?: Joi.AnySchema;
  query?: Joi.AnySchema;
  path?: Joi.AnySchema;
}

const EventMapHelper = {
  headers: "headers",
  body: "body",
  query: "queryStringParameters",
  path: "pathParameters",
};

export const joiValidator = (
  schema: JoiValidatorSchema,
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<void> => {
    const requestData = {
      headers: request.event.headers,
      body: request.event.body,
      query: request.event.queryStringParameters,
      path: request.event.pathParameters,
    };

    const errors = Object.keys(schema)
      .map((key) => {
        const validationResult = schema[key]!.validate(requestData[key], { abortEarly: false, convert: true });
        if (validationResult.error) {
          return validationResult.error.message;
        }
        const { value } = validationResult;

        request.event[EventMapHelper[key]] = value;
      })
      .filter((error) => error);

    if (errors.length > 0) {
      const errorDetails = errors.join("\r\n");

      throw new HttpError(errorDetails, StatusCodes.BAD_REQUEST);
    }
  };

  return {
    before,
  };
};
