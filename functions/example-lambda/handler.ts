import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { ExampleModel } from "../../shared/models/example.model";
import { StatusCodes } from "http-status-codes";
import { createConfig } from "./config";
import { ExampleLambdaPayload, exampleLambdaSchema } from "./event.schema";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { queryParser } from "../../shared/middleware/query-parser";
import { zodValidator } from "../../shared/middleware/zod-validator";
import { httpCorsConfigured } from "../../shared/middleware/http-cors-configured";
import { httpErrorHandlerConfigured } from "../../shared/middleware/http-error-handler-configured";
import { createFindManyOptions, makePaginationResult } from "../../shared/pagination-utils/pagination-utils";
import { Like } from "typeorm";

const connectToDb = dataSource.initialize();
const config = createConfig(process.env);
const userRepository = dataSource.getRepository(ExampleModel);

const lambdaHandler = async (event: ExampleLambdaPayload) => {
  const queryParams = event.queryStringParameters;
  winstonLogger.info(`Hello from ${config.appName}. Example param is: ${queryParams.exampleParam}`);

  await connectToDb;

  const findOptions = createFindManyOptions(userRepository, queryParams);

  if (queryParams.search) {
    findOptions.where = { ...findOptions.where, email: Like(`%${queryParams.search}%`) };
  }
  const [data, total] = await userRepository.findAndCount(findOptions);

  return awsLambdaResponse(
    StatusCodes.OK,
    makePaginationResult(data, total, findOptions, event.queryStringParameters.search),
  );
};

export const handle = middy()
  .use(jsonBodyParser())
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(httpCorsConfigured)
  .use(queryParser())
  .use(zodValidator(exampleLambdaSchema))
  .use(httpErrorHandlerConfigured)
  .handler(lambdaHandler);
