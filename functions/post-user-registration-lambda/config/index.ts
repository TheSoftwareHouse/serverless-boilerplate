import { z } from "zod";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  postUserRegistrationToken: env.POST_USER_REGISTRATION_TOKEN,
});

const validateConfig = (config: any) => {
  const schema = z.object({
    postUserRegistrationToken: z.string().min(1),
  });

  try {
    return schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createConfig = pipeline(loadEnvs, validateConfig);
