import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";

type Param = string | string[] | { [key: string]: any } | undefined;

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
      const isNested = /^\w+\[\w+\]$/.test(key);
      let queryKey;

      if (hasArrayInName) {
        queryKey = key.replace("[]", "");
      } else if (isNested) {
        [queryKey] = key.split("[");
      } else {
        queryKey = key;
      }

      let value: Param = queryParams[key];

      if (hasArrayInName || multiValueQueryParams[key]!.length > 1) {
        value = multiValueQueryParams[key];
      }

      if (isNested) {
        const nestedKeyMatch = key.match(/\[(\w+)\]$/);
        const nestedKey = nestedKeyMatch ? nestedKeyMatch[1] : undefined;

        if (nestedKey) {
          value = { [nestedKey]: queryParams[key] };
        }
      }

      resultQuery[queryKey] = value;
    });

    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    event.queryStringParameters = resultQuery;
  };

  return { before };
};
