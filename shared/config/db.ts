import { z } from "zod";
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

export const config = createDbConfigFromEnvs(process.env);

export const dataSource = new DataSource(config);
