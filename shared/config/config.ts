export interface AppConfig {
  appName: string;
  region: string;
  postgresUrl: string;
}

export const createConfig = (env: any): AppConfig => ({
  appName: env.APP_NAME,
  region: env.AWS_S3_REGION,
  postgresUrl: env.POSTGRES_URL,
});
