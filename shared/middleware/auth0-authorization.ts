import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { winstonLogger } from "../logger";
import { HttpError } from "../errors/http.error";
import { StatusCodes } from "http-status-codes";
import { BearerToken, TokenPayload } from "../tokens/bearer.token";
import { createSharedConfig } from "../config/config";

const config = createSharedConfig(process.env);


export const validateAccessToken = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async ({ event }): Promise<void> => {
    const { authorization } = event.headers;

    if (!authorization) {
      winstonLogger.info("Authorization Bearer token not found in headers");
      throw new HttpError(StatusCodes.UNAUTHORIZED, "Authorization Bearer token not found in headers.");
    }
    
    const isTokenValid = BearerToken.isValid(authorization);

    if (!isTokenValid) {
      winstonLogger.info("Authorization Bearer token is not valid");
      throw new HttpError(StatusCodes.UNAUTHORIZED, "Authorization Bearer token is not valid");
    }

    try {
      if (await BearerToken.verifyJwtToken(authorization, config.auth0JwksUri)) {
        const tokenPayload: TokenPayload = BearerToken.decodeToken(authorization);
        const { email } = tokenPayload;
  
        if (!email) {
          winstonLogger.info("Invalid Bearer token payload");
          throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid Bearer token payload");
        }
  
        event.queryStringParameters = { email };
      }
    } catch (error) {
      winstonLogger.info("Access denied");
      throw new HttpError(StatusCodes.UNAUTHORIZED, "Access denied");
    }
  };

  return { before };
};