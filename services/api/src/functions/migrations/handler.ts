import { Context } from "aws-lambda";
import middy from "@middy/core";

import { winstonLogger } from "../../../../../shared/src/logger";
import { ConnectionManager } from "../../../../../shared/src/utils/connection-manager";

export const handle = middy(async function handle(__: any, _: Context): Promise<any> {
  winstonLogger.info("Pre connection");

  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.getConnection();

  await connection.runMigrations();

  winstonLogger.info("Post connection");

  return;
});
