import { Context } from "aws-lambda";

export const handle = async (event: { [key: string]: any }, _context: Context) => {
  // do something
  return event;
};
