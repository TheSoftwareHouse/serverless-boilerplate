import { stringify } from "querystring";

export type Params = Record<string, any>;

export const createUrlFactory = (baseUrl: string) => (path: string, params: Params = {}): string => {
  const hasParams = Object.keys(params).length;
  const url = `${baseUrl}/${path}`;

  if (!hasParams) {
    return url;
  }

  return `${url}?${stringify(params)}`;
};
