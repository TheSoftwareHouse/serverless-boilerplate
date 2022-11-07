import httpErrorHandler from "@middy/http-error-handler";
import { httpErrorHandlerOptions } from "./utils/http-error-hadler.config";

export const httpErrorHandlerConfigured = httpErrorHandler(httpErrorHandlerOptions);
