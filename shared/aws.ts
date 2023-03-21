import { StatusCodes } from "http-status-codes";
import { AppError } from "./errors/app.error";
import { HttpError } from "./errors/http.error";

export const awsLambdaResponse = (statusCode: number, body?: any) => ({
  statusCode,
  body: body ? JSON.stringify(body) : body,
});

export const createErrorResponse = (error: any) => {
  if (error instanceof HttpError) {
    return awsLambdaResponse(error.status, error.message);
  }

  if (error instanceof AppError) {
    return awsLambdaResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }

  return awsLambdaResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Unknown error");
};
