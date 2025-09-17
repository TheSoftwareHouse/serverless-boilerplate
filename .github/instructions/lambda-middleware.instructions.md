---
applyTo: "**/functions/*/handler.ts"
---

## Middleware Stack
Always use middleware in this specific order for consistency:

```typescript
import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { inputOutputLoggerConfigured } from "../../shared/middleware/input-output-logger-configured";
import { zodValidator } from "../../shared/middleware/zod-validator";
import { queryParser } from "../../shared/middleware/query-parser";
import { httpCorsConfigured } from "../../shared/middleware/http-cors-configured";
import { httpErrorHandlerConfigured } from "../../shared/middleware/http-error-handler-configured";

export const handle = middy()
  .use(jsonBodyParser())                    // 1. Parse JSON body
  .use(inputOutputLoggerConfigured())       // 2. Log inputs and outputs
  .use(httpEventNormalizer())               // 3. Normalize HTTP events
  .use(httpHeaderNormalizer())              // 4. Normalize HTTP headers
  .use(httpCorsConfigured)                  // 5. Handle CORS
  .use(queryParser())                       // 6. Parse query parameters (optional)
  .use(zodValidator(yourLambdaSchema))      // 7. Validate input schema
  .use(httpErrorHandlerConfigured)          // 8. Handle errors (MUST BE LAST)
  .handler(lambdaHandler);
```

## Middleware Rules
- `httpErrorHandlerConfigured` must always be the last middleware
- `jsonBodyParser()` should be first for HTTP endpoints that accept JSON
- `queryParser()` is optional - only include if your function uses query parameters
- `zodValidator()` should come after all parsers but before error handler

## Optional Middleware
- Include `queryParser()` only if your event schema includes `queryStringParameters`
- For non-HTTP triggers (SQS, EventBridge), omit HTTP-specific middleware:
  - Skip `httpEventNormalizer()`
  - Skip `httpHeaderNormalizer()`
  - Skip `httpCorsConfigured`
  - Skip `queryParser()`