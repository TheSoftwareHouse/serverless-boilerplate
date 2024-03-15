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
import {
  calculateSkipFindOption,
  isFilterAvailable,
  makePaginationResult,
} from "../../shared/pagination-utils/pagination-utils";

const connectToDb = dataSource.initialize();
const config = createConfig(process.env);
const userRepository = dataSource.getRepository(ExampleModel);

const lambdaHandler = async (event: ExampleLambdaPayload) => {
  winstonLogger.info(`Hello from ${config.appName}. Example param is: ${event.queryStringParameters.exampleParam}`);

  await connectToDb;

  const { page, limit, sort, filter } = event.queryStringParameters;
  const findOptions = {} as any;

  if (limit && page) {
    findOptions.take = limit;
    findOptions.skip = calculateSkipFindOption(page, limit);
  }

  if (sort && isFilterAvailable(sort, userRepository)) {
    findOptions.order = sort;
  }

  if (filter && isFilterAvailable(filter, userRepository)) {
    findOptions.where = filter;
  }

  const [data, total] = await userRepository.findAndCount(findOptions);

  return awsLambdaResponse(StatusCodes.OK, makePaginationResult(data, total, limit, page));
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
