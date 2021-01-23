import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createErrorResponse } from "../aws";
import { winstonLogger } from "../logger";

export type MiddlewareObject<T, U> = middy.MiddlewareObject<T, U>;

export const handleError = (): MiddlewareObject<APIGatewayEvent, APIGatewayProxyResult> => ({
  onError: (handler, next) => {
    winstonLogger.error(handler.error.message);

    handler.response = createErrorResponse(handler.error);

    return next();
  },
});
