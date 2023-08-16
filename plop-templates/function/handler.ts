import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { StatusCodes } from "http-status-codes";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { createConfig } from "./config";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { {{pascalCase name}}LambdaPayload, {{camelCase name}}LambdaSchema } from "./event.schema";
import { zodValidator } from "../../shared/middleware/zod-validator";
import { queryParser } from "../../shared/middleware/query-parser";
import { httpCorsConfigured } from "../../shared/middleware/http-cors-configured";
import { httpErrorHandlerConfigured } from "../../shared/middleware/http-error-handler-configured";

const connectToDb = dataSource.initialize();
const config = createConfig(process.env);

const lambdaHandler = async (event: {{pascalCase name}}LambdaPayload) => {
  winstonLogger.info("Pre connection");
  winstonLogger.info(`Config: ${JSON.stringify(config)}`);
  await connectToDb;

  winstonLogger.info("Post connection");

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
  .use(zodValidator({{camelCase name}}LambdaSchema))
  .use(httpErrorHandlerConfigured)
  .handler(lambdaHandler);
