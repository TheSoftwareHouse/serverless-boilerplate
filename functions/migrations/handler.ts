import { Context } from "aws-lambda";
import middy from "@middy/core";

import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { ConnectionManager } from "../../shared/utils/connection-manager";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { customHttpErrorHandler } from "../../shared/middleware/custom-http-error-handler";

export const handle = middy(async function handle(__: any, _: Context): Promise<any> {
  winstonLogger.info("Pre connection");

  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.getConnection();

  await connection.runMigrations();

  winstonLogger.info("Post connection");

  return awsLambdaResponse(200, {
    success: true,
  });
})
  .use(inputOutputLoggerConfigured())
  .use(customHttpErrorHandler());
