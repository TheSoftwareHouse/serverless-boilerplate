import { Context } from "aws-lambda";

import { awsLambdaResponse } from "../../shared/aws";
import { handleError } from "../../shared/error-handler";

export async function handle(event: any, _: Context): Promise<any> {
  try {
    return awsLambdaResponse(200, {
      success: true,
    });
  } catch (e) {
    console.error(e);

    return handleError(e);
  }
}
