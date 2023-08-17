<p align="center">
 <img src="data/logo.svg" alt="" />
</p>

<p align="center">
   Current travis build:
  <a href="https://travis-ci.com/TheSoftwareHouse/serverless-boilerplate"><img src="https://travis-ci.com/TheSoftwareHouse/serverless-boilerplate.svg?branch=master" alt="build status" height="18"></a>
  &emsp;
</p>

##

Boilerplate code for rapidly creating ready-to-deploy Serverless Framework services.

##

### Quick Start

- **Install**

```
npm install
```

rename .env.dist to .env, fill all information

- **Create lambda or workflow**

```
npm run plop
```

##

### Development Local

- docker-compose up
- npm install
- rename .env.dist to .env
- fill all information
- npm run run-migrations
- npm run dev

### Debugging locally

Serverless uses workers to run lambdas locally. To debug them in your IDE you need to add `--useInProcess` flag, or run the following command:

```
npm run dev-with-debug
```

##

### Run workflow locally

- npm run start-workflow --workflow=NAME_OF_THE_WORKFLOW

### Follow workflow logs

To follow all the logs from the step function executions you can use the command:

```
npm run get-sf-logs
```

##

### Develop workflow

We support ASL for Step Functions. Make sure to install AWS Toolkit so you can render graph for step functions and validate its syntax easily.

##

### Deploy

The best choice for deployment is the bitbucket pipeline.

Deployment [pipeline](bitbucket-pipelines.yml) consist of two steps:

1. compile (automated start)
   - build
   - run lambda offline
   - run test
2. deploy (user action required)

##

### Other good source of information

- https://serverless.com/framework/docs/providers/aws/guide/variables/
- https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/

##

### What do we use for testing lambdas?

1. [supertest](https://github.com/visionmedia/supertest#readme)
1. [mocha](https://mochajs.org/)

Here you can check example tests: [handler.spec.ts](functions/example-lambda/tests/handler.spec.ts)

##

### What do we use for validating schemas?

We use [zod](https://zod.dev/) for schema validation.

##

### **Issues:**

If you notice any issues while using, let as know on **[github](https://github.com/TheSoftwareHouse/serverless-boilerplate/issues)**.
Security issues, please send on <a href="mailto:security.opensource@tsh.io"><b>email</b></a>

### **You may also like our other projects:**

- **[RAD Modules](https://github.com/TheSoftwareHouse/rad-modules)**
- **[RAD Modules Tools](https://github.com/TheSoftwareHouse/rad-modules-tools)**
- **[Kakunin](https://github.com/TheSoftwareHouse/Kakunin)**
- **[Babelsheet-js](https://github.com/TheSoftwareHouse/babelsheet-js)**
- **[Fogger](https://github.com/TheSoftwareHouse/fogger)**

### **About us:**

<p align="center">
  <a href="https://tsh.io/pl"><b>The Software House</b></a>
  &emsp;
  <img src="data/tsh.png" alt="tsh.png" width="50" />
</p>

##

### License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/serverless-boilerplate/main/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).
