import { Context } from "aws-lambda";

import { awsLambdaResponse } from "../../shared/aws";
import { handleError } from "../../shared/error-handler";
import { winstonLogger } from "../../shared/logger";
import { ConnectionManager } from "../../shared/utils/connection-manager";

export async function handle(__: any, _: Context): Promise<any> {
  try {
    winstonLogger.info("Pre connection");

    const connectionManager = new ConnectionManager();
    const connection = await connectionManager.getConnection();

    await connection.runMigrations();

    winstonLogger.info("Post connection");

    return awsLambdaResponse(200, {
      success: true,
    });
  } catch (e) {
    winstonLogger.error(e.message);

    return handleError(e);
  }
}
