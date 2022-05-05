import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../../../../shared/src/aws";
import { winstonLogger } from "../../../../../shared/src/logger";
import { ConnectionManager } from "../../../../../shared/src/utils/connection-manager";
import { ExampleModel } from "../../../../../shared/src/models/example.model";
import { v4 } from "uuid";
import { createConfig } from "./config";
import { joiValidator } from "../../../../../shared/src/middleware/joi-validator";
import { schema } from "./event.schema";
import { inputOutputLoggerConfigured } from "../../../../../shared/src/middleware/input-output-logger-configured";
import { customHttpErrorHandler } from "../../../../../shared/src/middleware/custom-http-error-handler";
import { queryParser } from "../../../../../shared/src/middleware/query-parser";

const config = createConfig(process.env);

export const handle = middy(async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const queryParams = event.queryStringParameters;

  winstonLogger.info(`Hello from ${config.appName}. Example param is: ${queryParams}`);

  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.getConnection();

  await connection.getRepository(ExampleModel).save(
    ExampleModel.create({
      id: v4(),
      email: "some@tmp.pl",
      firstName: "Test",
      lastName: "User",
    }),
  );

  return awsLambdaResponse(200, {
    success: true,
    data: await connection.getRepository(ExampleModel).find({}),
  });
})
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(queryParser())
  .use(joiValidator(schema))
  .use(customHttpErrorHandler());
