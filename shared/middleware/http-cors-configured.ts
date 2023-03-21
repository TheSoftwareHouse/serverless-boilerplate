import cors from "@middy/http-cors";
import { httpCorsConfig } from "./utils/http-cors.config";

export const httpCorsConfigured = cors(httpCorsConfig);
