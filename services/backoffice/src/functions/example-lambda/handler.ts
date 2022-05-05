import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../../../../shared/src/aws";
import { inputOutputLoggerConfigured } from "../../../../../shared/src/middleware/input-output-logger-configured";
import { customHttpErrorHandler } from "../../../../../shared/src/middleware/custom-http-error-handler";

export const handle = middy(async (_event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  return awsLambdaResponse(200, {
    success: true,
    data: {
      hello: "world",
    },
  });
})
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(customHttpErrorHandler());
