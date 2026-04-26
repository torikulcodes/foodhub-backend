import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { envVariables } from "../config/env.js";

const isProd = envVariables.NODE_ENV === envVariables.NODE_ENV;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  secret: envVariables.BETTER_AUTH_SECRET,
  baseURL: envVariables.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://foodhub-client-eta.vercel.app",
  ],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  session: {
    cookieCache: {
      enabled: false,
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    cookieSameSite: "none",
    useSecureCookies: true,
  },
  logger: {
    level: "debug",
    logger: console,
  },
});
