import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { StatusCodes } from "http-status-codes";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { MeLambdaPayload, meLambdaSchema } from "./event.schema";
import { zodValidator } from "../../shared/middleware/zod-validator";
import { queryParser } from "../../shared/middleware/query-parser";
import { httpCorsConfigured } from "../../shared/middleware/http-cors-configured";
import { httpErrorHandlerConfigured } from "../../shared/middleware/http-error-handler-configured";
import { ExampleModel } from "../../shared/models/example.model";
import { HttpError } from "../../shared/errors/http.error";
import { validateAccessToken } from "../../shared/middleware/auth0-authorization";

const connectToDb = dataSource.initialize();
const userRepository = dataSource.getRepository(ExampleModel);

export const lambdaHandler = async (event: MeLambdaPayload) => {
  await connectToDb;

  const { email } = event.queryStringParameters;

  const profileModel = await userRepository.findOne({ where: { email } });

  if (!profileModel) {
    winstonLogger.info(`User with email "${email}" does not exist`);
    throw new HttpError(StatusCodes.NOT_FOUND, `User with email "${email}" does not exist`);
  }

  return awsLambdaResponse(StatusCodes.OK, {
    success: true,
    data: profileModel,
  });
};

export const handle = middy()
  .use(jsonBodyParser())
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(httpCorsConfigured)
  .use(queryParser())
  .use(validateAccessToken())
  .use(zodValidator(meLambdaSchema))
  .use(httpErrorHandlerConfigured)
  .handler(lambdaHandler);
