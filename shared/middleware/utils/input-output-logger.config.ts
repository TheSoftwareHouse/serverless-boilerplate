import { winstonLogger } from "../../logger";

export const loggerOptions = {
  logger: (request: any) => {
    const log = request.event ?? request.response;
    winstonLogger.info(typeof log === "string" ? log : JSON.stringify(log));
  },
};
