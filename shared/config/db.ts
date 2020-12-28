import Joi from "joi";
import { pipeline } from "ts-pipe-compose";
import { exampleMigration1605111464989 } from "../../migrations/1605111464989-example-migration";
import { ExampleModel } from "../models/example.model";

// MODELS_IMPORT

const loadDbConfigFromEnvs = (env: any) => ({
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: [
    ExampleModel,
    // MODELS_SETUP
  ],
  migrations: [
    exampleMigration1605111464989,
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
    migrations: Joi.array().items(Joi.any().required()).required(),
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

const config = createDbConfigFromEnvs(process.env);

export = config;
