---
applyTo: "**/functions/*/*.spec.ts"
---

## Testing Lambda Services
- Create unit tests for services in `.spec.ts` files placed next to the service file
- Test file naming: `service.spec.ts` for `service.ts`
- Never create tests for handlers - only test service logic

## What NOT to Test
- Don't test middleware behavior (it's tested separately)
- Don't test AWS SDK internals
- Don't test TypeORM internals
- Don't test validation schemas (Zod handles this)
- Don't test handler functions (keep them thin)

## Test Coverage
Ensure you test:
- Happy path scenarios
- All error conditions
- Edge cases (empty data, boundary values)
- Business rule validations
- External service interactions
- Database operations