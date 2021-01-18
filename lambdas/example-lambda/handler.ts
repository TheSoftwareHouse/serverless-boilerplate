import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import joi from "joi";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../shared/aws";
import { handleError } from "../../shared/error-handler";
import { winstonLogger } from "../../shared/logger";
import { schema } from "./event.schema";
import { ConnectionManager } from "../../shared/utils/connection-manager";
import { ExampleModel } from "../../shared/models/example.model";
import { v4 } from "uuid";
import { createConfig } from "./config";
import { logIncomingEvent } from "../../shared/middleware/log-incomming-event";

const config = createConfig(process.env);

export const handle = middy(
  async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    try {
      const query = event.queryStringParameters;
      const { exampleParam } = joi.attempt(query, schema, { abortEarly: false });

      winstonLogger.info(`Hello from ${config.appName}. Example param is: ${exampleParam}`);

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
    } catch (e) {
      winstonLogger.error(e);

      return handleError(e);
    }
  },
).use(logIncomingEvent());
