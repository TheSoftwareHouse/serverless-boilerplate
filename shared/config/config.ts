export type AppConfig = {
  appName: string;
};

export const appConfig: AppConfig = {
  appName: process.env.APP_NAME as string,
};
