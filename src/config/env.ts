import dotenv from "dotenv";
import path from "path";
import AppError from "../middleware/error/app.error";
import { StatusCodes } from "http-status-codes";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
  override: true,
});

interface EnvConfig {
  DATABASE_URL: string;
  NODE_ENV: string;
  PORT: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  APP_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnv = [
    "DATABASE_URL",
    "NODE_ENV",
    "PORT",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "APP_URL",
  ];
  requiredEnv.forEach((env) => {
    if (!process.env[env]) {
      throw new AppError(
        `Missing env variable: ${env}`,
        StatusCodes.BAD_REQUEST,
      );
    }
  });
  return {
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    APP_URL: process.env.APP_URL as string,
  };
};

export const envVariables = loadEnvVariables();
