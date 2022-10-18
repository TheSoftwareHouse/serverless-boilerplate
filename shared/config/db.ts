import { string, boolean, object, array, mixed } from "yup";
import { pipeline } from "ts-pipe-compose";
import { exampleMigration1605111464989 } from "../../migrations/1605111464989-example-migration";
import { ExampleModel } from "../models/example.model";

// MODELS_IMPORT

const loadDbConfigFromEnvs = (env: NodeJS.ProcessEnv) => ({
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

const schema = object({
  type: string().required(),
  url: string().required(),
  synchronize: boolean().required(),
  logging: boolean().required(),
  entities: array(mixed()).min(1).required(),
  migrations: array(mixed()).min(1).required(),
  cli: object({
      migrationsDir: string().required(),
    })
    .required(),
});

const validateDbConfig = (config: Record<string, unknown>) => {
  return schema.validateSync(config);
};

const createDbConfigFromEnvs = pipeline(loadDbConfigFromEnvs, validateDbConfig);

const config = createDbConfigFromEnvs(process.env);

export = config;
