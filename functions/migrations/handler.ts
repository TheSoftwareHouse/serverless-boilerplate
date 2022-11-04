import middy from "@middy/core";
import { dataSource } from "../../shared/config/db";
import { winstonLogger } from "../../shared/logger";

const connectToDb = dataSource.initialize();

export const handle = middy(async (): Promise<void> => {
  winstonLogger.info("Pre connection");

  await connectToDb;
  await dataSource.runMigrations();

  winstonLogger.info("Post connection");
});
