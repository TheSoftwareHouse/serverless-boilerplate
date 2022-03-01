import { Context } from "aws-lambda";

// eslint-disable-next-line arrow-body-style
export const handle = async (event: { [key: string]: any }, _context: Context) => {
  // do something
  return event;
};
