import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../shared/aws";
import { winstonLogger } from "../../shared/logger";
import { ConnectionManager } from "../../shared/utils/connection-manager";
import { ExampleModel } from "../../shared/models/example.model";
import { v4 } from "uuid";
import { createConfig } from "./config";
import { logIncomingEvent } from "../../shared/middleware/log-incomming-event";
import { validateQuery } from "../../shared/middleware/validator";
import { schema } from "./event.schema";
import { handleError } from "../../shared/middleware/error-handler";

const config = createConfig(process.env);

export const handle = middy(
  async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    const queryParams = event.queryStringParameters;

    winstonLogger.info(`Hello from ${config.appName}. Example param is: ${queryParams}`);

    const connectionManager = new ConnectionManager();
    const connection = await connectionManager.getConnection();

    await connection.getRepository(ExampleModel).save(
      ExampleModel.create({
        id: v4(),
        email: "some@tmp.pl",
        firstName: "Test",
        lastName: "User",
      }),
    );

    return awsLambdaResponse(200, {
      success: true,
      data: await connection.getRepository(ExampleModel).find({}),
    });
  },
)
  .use(handleError())
  .use(logIncomingEvent())
  .use(validateQuery(schema));
