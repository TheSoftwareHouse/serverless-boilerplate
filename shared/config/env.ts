const dotenv = require("dotenv-safe");

export const loadEnvs = () => {
  dotenv.config({
    allowEmptyValues: process.env.NODE_ENV !== "production",
    example: ".env.dist",
  });
};
