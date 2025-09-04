---
applyTo: "**/functions/**/*"
---

# Serverless Lambda Development Guidelines

This is the main entry point for serverless lambda development instructions. Follow the specific guidelines based on the file you're working with:

## Quick Reference by File Type

### Handler Files (`handler.ts`)
See: [lambda-handlers.instructions.md](lambda-handlers.instructions.md)
- Main lambda entry point with middleware configuration
- Database connection handling
- AWS client initialization
- Response formatting

### Middleware Configuration
See: [lambda-middleware.instructions.md](lambda-middleware.instructions.md)
- Standard middy middleware stack
- Proper middleware ordering
- HTTP vs non-HTTP lambda configurations

### Event Schemas (`event.schema.ts`)
See: [lambda-schemas.instructions.md](lambda-schemas.instructions.md)
- Zod validation schemas
- Type generation
- Common validation patterns

### Configuration (`config/index.ts`)
See: [lambda-configuration.instructions.md](lambda-configuration.instructions.md)
- Environment variable handling
- Configuration validation
- Pipeline pattern implementation

### Service Layer (`service.ts`)
See: [lambda-services.instructions.md](lambda-services.instructions.md)
- Business logic separation
- Dependency injection patterns
- AWS SDK integration

### Testing (`*.spec.ts`)
See: [lambda-testing.instructions.md](lambda-testing.instructions.md)
- Unit testing with Sinon
- Mocking AWS services
- Test structure and patterns

## Development Workflow

1. **Create Function Structure**: Use the plop template or create the required files manually
2. **Define Event Schema**: Start with `event.schema.ts` to define input validation
3. **Configure Environment**: Set up `config/index.ts` with required environment variables
4. **Implement Handler**: Create the main `handler.ts` with middleware stack
5. **Add Business Logic**: If complex, create `service.ts` with business logic
6. **Write Tests**: Create `service.spec.ts` for testing business logic
7. **Configure Serverless**: Set up `function.yml` with proper events and settings