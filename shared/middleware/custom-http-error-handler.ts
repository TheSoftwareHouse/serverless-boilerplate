import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { StatusCodes } from "http-status-codes";
import { normalizeHttpResponse } from "@middy/util";
import { httpErrorHandlerOptions } from "./utils/http-error-hadler.config";
import { HttpError } from "../errors/http.error";
import { commonHeaders } from "../headers";

export interface CustomHttpErrorHandlerOptions {
  logger?: (error: any) => void;
  fallbackMessage?: string;
}

export const customHttpErrorHandler = (
  options = httpErrorHandlerOptions,
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const middleware = httpErrorHandler(options);
  return {
    onError: (request) => {
      if (!(request.error instanceof HttpError)) {
        request.error = new HttpError("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR, request.error);
      }

      const response = normalizeHttpResponse(request.response);

      response.headers = {
        ...commonHeaders,
      };

      request.response = response;

      return middleware.onError ? middleware.onError(request) : undefined;
    },
  };
};
