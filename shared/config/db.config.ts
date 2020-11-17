import { exampleMigration1605111464989 } from "../../migrations/1605111464989-example-migration";
import { ExampleModel } from "../models/example.model";
import { loadEnvs } from "./env";

// MODELS_IMPORT

loadEnvs();

const createDbConfigFromEnvs = (env: any) => ({
  type: "postgres",
  logging: false,
  synchronize: false,
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

const config = createDbConfigFromEnvs(process.env);

export = config;
