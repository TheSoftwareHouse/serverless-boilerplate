import Joi from "joi";
import { pipeline } from "ts-pipe-compose";
import { DataSource } from "typeorm";
import { migration1667584203150 } from "../../migrations/1667584203150-migration";
import { ExampleModel } from "../models/example.model";
import { loadEnvs } from "../utils/env";

// MODELS_IMPORT

loadEnvs();

const loadDbConfigFromEnvs = (env: any) => ({
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: [
    ExampleModel,
    // MODELS_SETUP
  ],
  migrations: [
    migration1667584203150,
    // PUT MIGRATIONS HERE
  ],
  cli: {
    migrationsDir: "migrations",
  },
  url: env.POSTGRES_URL,
});

const validateDbConfig = (config: any) => {
  const schema = Joi.object().keys({
    type: Joi.string().required(),
    url: Joi.string().required(),
    synchronize: Joi.any().allow(false).required(),
    logging: Joi.boolean().required(),
    entities: Joi.array().items(Joi.any().required()).required(),
    migrations: Joi.array().items(Joi.any().optional()).required(),
    cli: Joi.object()
      .keys({
        migrationsDir: Joi.string().required(),
      })
      .required(),
  });

  Joi.assert(config, schema);

  return config;
};

const createDbConfigFromEnvs = pipeline(loadDbConfigFromEnvs, validateDbConfig);

export const config = createDbConfigFromEnvs(process.env);

export const dataSource = new DataSource(config);
