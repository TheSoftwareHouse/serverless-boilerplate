---
applyTo: "**/functions/*/event.schema.ts"
---

## Event Schema Structure
- All event schemas must have a `.event.schema.ts` suffix
- Always use Zod for input validation and type generation
- Export both the schema and the inferred type

## Naming Conventions
- Schema names: `camelCase` with "Schema" suffix (e.g., `createTransactionSchema`)
- Type names: `PascalCase` with "Payload" suffix (e.g., `CreateTransactionPayload`)
- Use descriptive names that match the function purpose