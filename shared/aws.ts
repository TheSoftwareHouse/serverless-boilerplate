import { commonHeaders } from "./headers";

export const awsLambdaResponse = (statusCode: number, body: any) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      ...commonHeaders,
    },
  };
};
