import { commonHeaders } from "./headers";
import { AppError } from "./errors/app.error";
import { HttpError } from "./errors/http.error";

export const awsLambdaResponse = (statusCode: number, body?: any) => ({
  statusCode,
  body: body ? JSON.stringify(body) : body,
  headers: {
    ...commonHeaders,
  },
});

export const createErrorResponse = (error) => {
  if (error instanceof HttpError) {
    return awsLambdaResponse(error.status, error.message);
  }

  if (error instanceof AppError) {
    return awsLambdaResponse(500, error.message);
  }

  return awsLambdaResponse(500, "Unknown error");
};
