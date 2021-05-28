import { Context } from "aws-lambda";
import middy from "@middy/core";

import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { ConnectionManager } from "../../shared/utils/connection-manager";
import { handleError } from "../../shared/middleware/error-handler";
import { logIncomingEvent } from "../../shared/middleware/log-incomming-event";

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
  .use(handleError())
  .use(logIncomingEvent());
