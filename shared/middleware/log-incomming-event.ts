import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { winstonLogger } from "../logger";

export type MiddlewareObject<T, U> = middy.MiddlewareObject<T, U>;

export const logIncomingEvent = (): MiddlewareObject<APIGatewayEvent, APIGatewayProxyResult> => ({
  before: (handler, next) => {
    winstonLogger.info(JSON.stringify(handler.event));
    return next();
  },
});
