import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { dataSource } from "../../shared/config/db";
import { createConfig } from "./config";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import httpErrorHandler from "@middy/http-error-handler";

const connectToDb = dataSource.initialize();
const config = createConfig(process.env);

export const handle = middy(
  async (_event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    winstonLogger.info("Pre connection");
    winstonLogger.info(`Config: ${JSON.stringify(config)}`);
    await connectToDb;

    winstonLogger.info("Post connection");

    return awsLambdaResponse(200, {
      success: true,
    });
  },
)
.use(inputOutputLoggerConfigured())
.use(httpEventNormalizer())
.use(httpHeaderNormalizer())
.use(httpErrorHandler());
