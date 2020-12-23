import Joi from "joi";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  appName: env.APP_NAME,
});

const validateConfig = (config: any) => {
  const schema = Joi.object().keys({
    appName: Joi.string().required(),
  });

  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

export const createConfig = pipeline(loadEnvs, validateConfig);
