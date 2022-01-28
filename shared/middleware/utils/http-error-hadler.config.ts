import { winstonLogger } from "../../logger";

export const httpErrorHandlerOptions = {
  logger: (error: any) => {
    const message = error.statusCode < 500 ? "HTTP ERROR:" : "INTERNAL ERROR:";
    winstonLogger.error(message, error);
  },
  fallbackMessage: JSON.stringify({
    message: "Internal server error",
  }),
};
