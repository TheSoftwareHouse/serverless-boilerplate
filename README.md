[![Build Status](https://travis-ci.com/TheSoftwareHouse/serverless-boilerplate.svg?branch=master)](https://travis-ci.com/github/TheSoftwareHouse/serverless-boilerplate)

## Serverless Boilerplate

Boilerplate code for rapidly creating ready-to-deploy Serverless Framework services.

## Quick Start

- **Install**
```
npm install
```
  rename .env.dist to .env, fill all information

- **Create lambda**
```
npm run plop
```
#### Development Local

- npm install
- rename .env.dist to .env
- fill all information
- npm run dev

#### Deploy

The best choice for deployment is the bitbucket pipeline.

Deployment [pipeline](bitbucket-pipelines.yml) consist of two steps:

1. compile (automated start)
    - build
    - run lamda offline
    - run tests
2. deploy (user action required)

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

We use  [joi](https://joi.dev/) for schema validation.

## License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/serverless-boilerplate/main/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).
