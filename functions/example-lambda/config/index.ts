import { object, string } from "yup";
import { pipeline } from "ts-pipe-compose";

const loadEnvs = (env: NodeJS.ProcessEnv) => ({
  appName: env.APP_NAME,
});

const schema = object({
  appName: string().required(),
});

const validateConfig = (config: Record<string, unknown>) => schema.validateSync(config);

export const createConfig = pipeline(loadEnvs, validateConfig);
