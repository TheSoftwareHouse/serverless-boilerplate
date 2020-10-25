import { commonHeaders } from "./headers";

export const awsLambdaResponse = (statusCode: number, body?: any) => {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : body,
    headers: {
      ...commonHeaders,
    },
  };
};
