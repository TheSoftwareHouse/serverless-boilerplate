import { z } from "zod";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  auth0JwksUri: env.AUTH0_JWKS_URI,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    auth0JwksUri: z.string().min(1),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createSharedConfig = pipeline(loadEnvs, validateConfig);
