import middy from "@middy/core";
import { AnySchema, ValidationError } from "yup";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../errors/http.error";

export interface YupValidatorSchema {
  headers?: AnySchema;
  body?: AnySchema;
  query?: AnySchema;
  path?: AnySchema;
}

const EventMapHelper = {
  headers: "headers",
  body: "body",
  query: "queryStringParameters",
  path: "pathParameters",
};

export const yupValidator = (
  schema: YupValidatorSchema,
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<void> => {
    const requestData = {
      headers: request.event.headers,
      body: request.event.body,
      query: request.event.queryStringParameters,
      path: request.event.pathParameters,
    };

    const errors = Object.keys(schema)
      .map((key: keyof YupValidatorSchema) => {
        try {
          const value = schema[key]?.validateSync(requestData[key], { abortEarly: false });
          request.event[EventMapHelper[key]] = value;
        } catch(err) {
          if(err instanceof ValidationError) {
            return err.inner.map(({ message }) => message)
          }
          throw err;
        }
      })
      .flat()
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
