import { Context } from "aws-lambda";

import { awsLambdaResponse } from "../../shared/aws";
import { handleError } from "../../shared/error-handler";
import { winstonLogger } from "../../shared/logger";
import { loadEnvs } from "../../shared/config/env";
import { MemberModel } from "../../shared/models/member.model";
import { ConnectionManager } from "../../shared/utils/connection-manager";

loadEnvs();

export async function handle(__: any, _: Context): Promise<any> {
  try {
    winstonLogger.info("Pre connection");

    const connectionManager = new ConnectionManager();
    const connection = await connectionManager.getConnection();

    await connection.runMigrations();

    winstonLogger.info("Post connection");

    return awsLambdaResponse(200, {
      success: true,
      data: await connection.getRepository(MemberModel).find({}),
    });
  } catch (e) {
    console.error(e);

    return handleError(e);
  }
}
