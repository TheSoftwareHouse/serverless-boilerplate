import { Context } from "aws-lambda";

export const handle = (event: { [key: string]: any }, _context: Context) => {
  // do something
  return event;
};
