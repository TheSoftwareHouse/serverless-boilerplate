import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { StatusCodes } from "http-status-codes";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { PostUserRegistrationLambdaLambdaPayload, postUserRegistrationLambdaLambdaSchema } from "./event.schema";
import { zodValidator } from "../../shared/middleware/zod-validator";
import { queryParser } from "../../shared/middleware/query-parser";
import { httpCorsConfigured } from "../../shared/middleware/http-cors-configured";
import { httpErrorHandlerConfigured } from "../../shared/middleware/http-error-handler-configured";
import { ExampleModel } from "../../shared/models/example.model";
import { postUserRegistrationTokenHandler } from "../../shared/middleware/post-user-registration-token-handler";

const connectToDb = dataSource.initialize();
const userRepository = dataSource.getRepository(ExampleModel);

const lambdaHandler = async (event: PostUserRegistrationLambdaLambdaPayload) => {
  await connectToDb;
  await userRepository.save(ExampleModel.create(event.body));

  winstonLogger.info(`Post user ${event.body.email} registration action executed`);

  return awsLambdaResponse(StatusCodes.OK, {
    success: true,
  });
};

export const handle = middy()
  .use(jsonBodyParser())
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(httpCorsConfigured)
  .use(queryParser())
  .use(postUserRegistrationTokenHandler())
  .use(zodValidator(postUserRegistrationLambdaLambdaSchema))
  .use(httpErrorHandlerConfigured)
  .handler(lambdaHandler);
