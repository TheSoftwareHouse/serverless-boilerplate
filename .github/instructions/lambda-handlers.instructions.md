---
applyTo: "**/functions/*/handler.ts"
---

## Lambda Handler Structure
- All handlers must have a `.handler.ts` suffix
- Always use the middy middleware framework with the standard middleware stack (see lambda-middleware.instructions.md)
- Export the handler as `handle`

## Response Format
- Always use `awsLambdaResponse` helper for consistent response formatting:
```typescript
import { awsLambdaResponse } from "../../shared/aws";
import { StatusCodes } from "http-status-codes";

return awsLambdaResponse(StatusCodes.OK, {
  success: true,
  data: result,
});
```

## Business Logic Separation
- Extract complex business logic into separate service functions
- Pass all dependencies (clients, repositories, config) to service functions
- Keep handlers thin - they should only handle HTTP concerns and orchestration