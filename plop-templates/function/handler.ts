import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../shared/src/aws";
import { winstonLogger } from "../../shared/src/logger";
import { ConnectionManager } from "../../shared/src/utils/connection-manager";
import { createConfig } from "./config";
import { inputOutputLoggerConfigured } from "../../shared/src/middleware/input-output-logger-configured";
import { customHttpErrorHandler } from "../../shared/src/middleware/custom-http-error-handler";

const config = createConfig(process.env);

export const handle = middy(
  async (_event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    winstonLogger.info("Pre connection");
    winstonLogger.info(`Config: ${JSON.stringify(config)}`);

    const connectionManager = new ConnectionManager();
    await connectionManager.getConnection();

    winstonLogger.info("Post connection");

    return awsLambdaResponse(200, {
      success: true,
    });
  },
)
.use(inputOutputLoggerConfigured())
.use(customHttpErrorHandler());
