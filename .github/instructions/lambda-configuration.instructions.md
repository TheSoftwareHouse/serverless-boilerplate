---
applyTo: "**/functions/*/config/index.ts"
---

## Configuration Structure
- All functions must have a `config/index.ts` file for environment variable handling
- Always use Zod for configuration validation
- Use the pipeline pattern with `ts-pipe-compose`

## Basic Configuration Template
```typescript
import { z } from "zod";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  appName: env.APP_NAME,
  // Add other environment variables here
});

const validateConfig = (config: any) => {
  const schema = z.object({
    appName: z.string().min(1),
    // Add validation for other variables
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
```

## Environment Variable Naming
- Use SCREAMING_SNAKE_CASE for environment variable names
- Be descriptive: `EXCHANGE_RATES_API_URL` not `API_URL`
- Include service name: `PAYMENT_SERVICE_API_KEY`