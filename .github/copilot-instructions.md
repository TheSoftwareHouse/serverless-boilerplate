# Coding Guidelines for Serverless TypeScript Application

## Project Overview

This repository is a serverless application boilerplate using AWS Lambda functions, TypeScript, and the Serverless Framework. It follows modern serverless patterns and best practices for building scalable applications on AWS infrastructure.

## Code Architecture

### Key Patterns
- **Serverless Functions**: Individual Lambda functions with specific responsibilities, each in its own directory
- **Microservices approach**: Each function handles a specific business capability
- **Dependency Injection**: Functions receive dependencies as parameters for better testability
- **Middleware-based processing**: Uses Middy middleware for cross-cutting concerns
- **Schema validation**: Zod schemas for input validation and type safety

### Project Structure
```
functions/
├── [function-name]/          # Each function has its own directory
│   ├── handler.ts            # Main lambda handler with middleware
│   ├── service.ts            # Business logic (optional)
│   ├── service.spec.ts       # Unit tests for service
│   ├── event.schema.ts       # Zod validation schema
│   ├── function.yml          # Serverless configuration
│   └── config/
│       └── index.ts          # Environment configuration
shared/
├── config/                   # Database and shared configuration
├── errors/                   # Custom error classes
├── middleware/               # Reusable middleware functions
├── models/                   # TypeORM database models
├── repositories/             # Data access layer
├── utils/                    # Shared utility functions
└── logger/                   # Winston logging setup
workflows/
├── [workflow-name]/          # Step Functions workflows
│   ├── workflow.yml          # Step Function definition
│   └── workflow.asl.yml      # Amazon States Language
migrations/                   # TypeORM database migrations
```

### Key Libraries and Functionalities
- **TypeScript**: For static typing and modern JavaScript features
- **Serverless Framework**: For deployment and infrastructure management
- **AWS Lambda**: Function compute platform
- **AWS Step Functions**: Workflow orchestration
- **Middy**: Lambda middleware framework for Node.js
- **TypeORM**: ORM for PostgreSQL database interactions
- **Zod**: Schema validation and type inference
- **Winston**: Structured logging
- **AWS SDK v3**: AWS service clients
- **PostgreSQL**: Primary database
- **DynamoDB**: NoSQL database for high-performance data storage
- **Mocha + Sinon**: Testing framework and mocking

### Key Development Guidelines

#### General Guidelines
- Always use TypeScript for type safety
- Follow serverless best practices and patterns
- Use dependency injection for all external dependencies
- All environment variables must be extracted and validated using Zod in function config files
- Use the provided middleware stack for all Lambda functions
- Keep functions focused on single responsibilities

#### Naming Guidelines
- Function directories: Use **kebab-case** (e.g., `create-transaction`, `get-exchange-rates`)
- File names: Use **kebab-case** with appropriate suffixes (e.g., `handler.ts`, `service.ts`)
- Variables and functions: Use **camelCase** (e.g., `getUserById`, `transactionData`)
- Classes and interfaces: Use **PascalCase** (e.g., `TransactionModel`, `PaymentService`)
- Database columns: Use **snake_case** for TypeORM entity properties
- Schema names: Use **camelCase** with "Schema" suffix (e.g., `createTransactionSchema`)
- AWS resources: Use descriptive names with service prefixes

#### Lambda Function Guidelines
- All handlers must use the standard Middy middleware stack
- Initialize database connections and AWS clients outside the handler function
- Use dependency injection - pass all dependencies to service functions
- Validate all inputs with Zod schemas
- Use existing error classes from `shared/errors/`
- Keep handlers thin - move business logic to service functions
- Never create tests for handlers - only test service logic

#### Database Guidelines
- Use **TypeORM** for PostgreSQL interactions
- Use **UUID v4** for primary keys, avoid auto-increment IDs
- Models must have `.model.ts` suffix and include factory methods
- Always generate migrations
- Migrations are auto-executed at application start
- Pass repositories to service functions, never import directly

#### AWS Integration Guidelines
- Use AWS SDK v3 with command pattern
- Initialize AWS clients outside Lambda handlers for connection reuse
- Use Step Functions for complex workflows
- Follow AWS security best practices

#### Testing Guidelines
- Create unit tests for service logic only (`.spec.ts` files)
- Use Sinon for mocking AWS clients and external dependencies
- Mock all external dependencies (databases, APIs, AWS services)
- Test both success and error scenarios
- Place tests next to the files they test

#### Error Handling Guidelines
- Use existing error classes
- Throw errors as exceptions - middleware handles responses
- Include meaningful error messages with context

#### Security Guidelines
- Never expose sensitive information in error messages
- Validate all inputs with Zod schemas
- Use proper IAM roles and permissions
- Store secrets in AWS Parameter Store or Secrets Manager
- Enable CORS only when necessary and configure properly

#### Middleware Guidelines
- Always use the standard middleware stack in correct order
- For non-HTTP triggers, omit HTTP-specific middleware
- Use custom middleware sparingly and document well

#### Workflow Guidelines
- Use Step Functions for complex business processes
- Define workflows in Amazon States Language (ASL)
- Each step should be a focused Lambda function
- Handle errors and retries at the workflow level
- Use Task Tokens for human-in-the-loop processes