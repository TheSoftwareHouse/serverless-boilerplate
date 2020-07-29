# README

Welcome to RAD modules serveless

#### Development Local

- npm install
- rename .env.dist to .env
- fill all information
- npm run dev

#### Deploy

- npm install
- login using command `./node_modules/.bin/serverless config credentials --provider aws --key 1234 --secret 5678`
- deploy using command `./node_modules/.bin/serverless deploy -s dev/prod`;

#### Other good source of information

- https://serverless.com/framework/docs/providers/aws/guide/variables/
- https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/

#### Lambdas

##### Infakt scheduler

GET /

Does nothing.
