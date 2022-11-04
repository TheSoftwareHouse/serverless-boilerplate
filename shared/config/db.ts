import { z } from "zod";
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
  const schema = z.object({
    type: z.string(),
    url: z.string().url(),
    synchronize: z.any(),
    logging: z.boolean(),
    entities: z.array(z.any()),
    migrations: z.array(z.any()),
    cli: z.object({
      migrationsDir: z.string(),
    }),
  });

  try {
    schema.parse(config);
  } catch (error) {
    throw new Error(error as string);
  }

  return config;
};

const createDbConfigFromEnvs = pipeline(loadDbConfigFromEnvs, validateDbConfig);

const config = createDbConfigFromEnvs(process.env);

export = config;
