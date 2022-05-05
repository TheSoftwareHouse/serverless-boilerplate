import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";

type Param = string | string[] | undefined;

interface QueryParams {
  [name: string]: Param;
}

export const queryParser = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async ({ event }): Promise<void> => {
    const resultQuery: QueryParams = {};
    const queryParams = event.queryStringParameters || {};
    const multiValueQueryParams = event.multiValueQueryStringParameters || {};

    Object.keys(queryParams).forEach((key) => {
      const hasArrayInName = key.endsWith("[]") && key.length > 2;
      const queryKey = hasArrayInName ? key.replace("[]", "") : key;

      let value: Param = queryParams[key];

      if (hasArrayInName || multiValueQueryParams[key]!.length > 1) {
        value = multiValueQueryParams[key];
      }

      resultQuery[queryKey] = value;
    });

    // @ts-ignore
    event.queryStringParameters = resultQuery;
  };

  return { before };
};
