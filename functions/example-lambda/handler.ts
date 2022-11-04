import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { ExampleModel } from "../../shared/models/example.model";
import { v4 } from "uuid";
import { createConfig } from "./config";
import { joiValidator } from "../../shared/middleware/joi-validator";
import { schema } from "./event.schema";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { queryParser } from "../../shared/middleware/query-parser";
import httpErrorHandler from "@middy/http-error-handler";

const connectToDb = dataSource.initialize();
const config = createConfig(process.env);

export const handle = middy(async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const queryParams = event.queryStringParameters;

  winstonLogger.info(`Hello from ${config.appName}. Example param is: ${queryParams}`);

  await connectToDb;

  await dataSource.getRepository(ExampleModel).save(
    ExampleModel.create({
      id: v4(),
      email: "some@tmp.pl",
      firstName: "Test",
      lastName: "User",
    }),
  );

  return awsLambdaResponse(200, {
    success: true,
    data: await dataSource.getRepository(ExampleModel).find({}),
  });
})
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(queryParser())
  .use(joiValidator(schema))
  .use(httpErrorHandler());
