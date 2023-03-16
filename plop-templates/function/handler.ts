import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { createConfig } from "./config";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { {{pascalCase name}}LambdaPayload } from "./event.schema";
import {zodValidator} from "../../shared/middleware/zod-validator";
import {exampleLambdaSchema} from "../../functions/example-lambda/event.schema";
import {queryParser} from "../../shared/middleware/query-parser";
import {httpErrorHandlerConfigured} from "../../shared/middleware/http-error-handler-configured";

const connectToDb = dataSource.initialize();
const config = createConfig(process.env);

const lambdaHandler = async (event: {{pascalCase name}}LambdaPayload) => {
  winstonLogger.info("Pre connection");
  winstonLogger.info(`Config: ${JSON.stringify(config)}`);
  await connectToDb;

  winstonLogger.info("Post connection");

  return awsLambdaResponse(200, {
    success: true,
  });
};

export const handle = middy()
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(queryParser())
  .use(zodValidator(exampleLambdaSchema))
  .use(httpErrorHandlerConfigured)
  .handler(lambdaHandler);
