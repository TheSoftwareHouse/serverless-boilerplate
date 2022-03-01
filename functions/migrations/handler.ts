import middy from "@middy/core";

import { winstonLogger } from "../../shared/logger";
import { ConnectionManager } from "../../shared/utils/connection-manager";

export const handle = middy(async (): Promise<void> => {
  winstonLogger.info("Pre connection");

  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.getConnection();

  await connection.runMigrations();

  winstonLogger.info("Post connection");
});
