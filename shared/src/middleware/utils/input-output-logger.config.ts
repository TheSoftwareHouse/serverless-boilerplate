import { winstonLogger } from "../../logger";

export const loggerOptions = {
  logger: (request) => {
    const log = request.event ?? request.response;
    winstonLogger.info(typeof log === "string" ? log : JSON.stringify(log));
  },
};
