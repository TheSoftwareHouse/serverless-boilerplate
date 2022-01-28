import inputOutputLogger from "@middy/input-output-logger";
import { loggerOptions } from "./utils/input-output-logger.config";

export const inputOutputLoggerConfigured = () => inputOutputLogger(loggerOptions);
