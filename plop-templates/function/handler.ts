import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { ConnectionManager } from "../../shared/utils/connection-manager";
import { createConfig } from "./config";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { customHttpErrorHandler } from "../../shared/middleware/custom-http-error-handler";

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
