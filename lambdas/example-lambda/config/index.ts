import Joi from "joi";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: any) => ({
  appName: env.APP_NAME,
});

const validateConfig = (config: any) => {
  const schema = Joi.object().keys({
    appName: Joi.string().required(),
  });

  Joi.attempt(config, schema);

  return config;
};

export const createConfig = pipeline(loadEnvs, validateConfig);
