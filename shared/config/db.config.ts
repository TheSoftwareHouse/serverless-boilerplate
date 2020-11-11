import { loadEnvs } from "./env";

// MODELS_IMPORT

loadEnvs();

const createDbConfigFromEnvs = (env: any) => ({
  type: "postgres",
  logging: false,
  synchronize: false,
  entities: [
    // MODELS_SETUP
  ],
  migrations: [
    // PUT MIGRATIONS HERE
  ],
  cli: {
    migrationsDir: "migrations",
  },
  url: env.POSTGRES_URL,
});

const config = createDbConfigFromEnvs(process.env);

export = config;
