import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET: z.string(),
    AUTH_SALT: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    REFRESH_TOKEN_TTL: z.number(),
    ACCESS_TOKEN_TTL: z.number(),
    QSTASH_URL: z.string().url(),
    QSTASH_TOKEN: z.string(),
    QSTASH_CURRENT_SIGNING_KEY: z.string(),
    QSTASH_NEXT_SIGNING_KEY: z.string(),
    NEXT_APP_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    EMAIL_VERIFICATION_TOKEN_TTL: z.number(),
    IMAGE_KIT_PRIVATE_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_SALT: process.env.AUTH_SALT,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    REFRESH_TOKEN_TTL: Number(process.env.REFRESH_TOKEN_TTL),
    ACCESS_TOKEN_TTL: Number(process.env.ACCESS_TOKEN_TTL),
    QSTASH_URL: process.env.QSTASH_URL,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
    NEXT_APP_URL: process.env.NEXT_APP_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_VERIFICATION_TOKEN_TTL: Number(
      process.env.EMAIL_VERIFICATION_TOKEN_TTL,
    ),
    NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT:
      process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT,
    NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY,
    IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
