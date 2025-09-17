---
applyTo: "**/functions/*/function.yml"
---

## Serverless Function Configuration
Each function must have a `function.yml` file with proper serverless framework configuration.

## Environment Variables
Always include required environment variables:

## Naming Conventions
- Function names: Use `kebab-case` matching the directory name
- Handler path: Always `functions/{function-name}/handler.handle`
- Environment variables: Use `SCREAMING_SNAKE_CASE`
