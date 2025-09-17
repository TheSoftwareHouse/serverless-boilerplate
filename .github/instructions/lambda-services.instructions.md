---
applyTo: "**/functions/*/service.ts"
---

## Service Layer Principles
- Extract complex business logic into separate `service.ts` files
- Services should be pure functions that accept all dependencies as parameters
- Never import dependencies directly in services - use dependency injection

## Error Handling
- Use existing error classes from `shared/errors/` (see lambda-error-handling.instructions.md)
- Validate business rules and throw appropriate errors
- Let the middleware handle error responses

## AWS SDK Integration
- Use AWS SDK v3 with command pattern
- Always pass clients as parameters
- Handle AWS SDK errors appropriately:

## Database Operations
- Always pass repositories as parameters
- Use TypeORM query builder for complex queries:

## Business Logic Validation
- Validate business rules before database operations
- Use domain-specific errors for business rule violations:

## Return Values
- Return only the data needed by the handler
- Don't return entire entities if only ID is needed
- Use meaningful return types:

## Utility Integration
- Pass utility classes as parameters when needed: