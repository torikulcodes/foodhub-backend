import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { envVariables } from "../config/env.js";

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
    useSecureCookies: envVariables.NODE_ENV === "production",
    defaultCookieAttributes: {
      sameSite: envVariables.NODE_ENV === "production" ? "none" : "lax",
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: ".vercel.app",
    },
  },
  logger: {
    level: "debug",
    logger: console,
  },
});
