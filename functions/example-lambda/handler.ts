import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { ExampleModel } from "../../shared/models/example.model";
import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import { createConfig } from "./config";
import { ExampleLambdaPayload, exampleLambdaSchema } from "./event.schema";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { queryParser } from "../../shared/middleware/query-parser";
import { zodValidator } from "../../shared/middleware/zod-validator";
import { httpCorsConfigured } from "../../shared/middleware/http-cors-configured";
import { httpErrorHandlerConfigured } from "../../shared/middleware/http-error-handler-configured";

const connectToDb = dataSource.initialize();
const config = createConfig(process.env);

const lambdaHandler = async (event: ExampleLambdaPayload) => {
  winstonLogger.info(`Hello from ${config.appName}. Example param is: ${event.queryStringParameters.exampleParam}`);

  await connectToDb;

  await dataSource.getRepository(ExampleModel).save(
    ExampleModel.create({
      id: randomUUID(),
      email: "some@tmp.pl",
      firstName: "Test",
      lastName: "User",
    }),
  );

  return awsLambdaResponse(StatusCodes.OK, {
    success: true,
    data: {
      users: await dataSource.getRepository(ExampleModel).find(),
      exampleParam: event.queryStringParameters.exampleParam,
    },
  });
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
