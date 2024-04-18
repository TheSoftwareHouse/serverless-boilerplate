import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { winstonLogger } from "../logger";
import { HttpError } from "../errors/http.error";
import { StatusCodes } from "http-status-codes";
import { createConfig } from "../../functions/post-user-registration-lambda/config";

export const postUserRegistrationTokenHandler = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async ({ event }): Promise<void> => {
    const token = event.headers["x-auth-token"];
    const config = createConfig(process.env);

    if (!token) {
      winstonLogger.info("Token not found in headers");
      throw new HttpError(StatusCodes.UNAUTHORIZED, "Token not found in headers");
    }

    if (token !== config.postUserRegistrationToken) {
      winstonLogger.info("Wrong authorization token");
      throw new HttpError(StatusCodes.UNAUTHORIZED, "Wrong authorization token");
    }
  };

  return { before };
};
