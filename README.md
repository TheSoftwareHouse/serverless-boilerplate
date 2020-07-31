# README

Welcome to serveless boilerplate

#### Development Local

- npm install
- rename .env.dist to .env
- fill all information
- npm run dev

#### Deploy

The best choice for deployment is the bitbucket pipeline.

Deployment pipeline consist of two steps:
1. compile (automated start)
    1. build
    1. run lamda offline 
    1. run tests
1. deploy (user action required)

#### Other good source of information

- https://serverless.com/framework/docs/providers/aws/guide/variables/
- https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/

## Lambdas

### Example lambda

GET /

Does nothing.

### HTTP Lambdas

####  What do we use for testing lambdas?

1. [supertest](https://github.com/visionmedia/supertest#readme)
1. [mocha](https://mochajs.org/)

Here you can check example tests: [handler.spec.ts](lambdas/example-lambda/tests/handler.spec.ts)

#### What do we use for validating schemas?

We use  [joi](https://hapi.dev/module/joi/) for schema validation.