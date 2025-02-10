import { signInFormSchema } from "@/common/schema";
import { env } from "@/env";
import bcrypt from "bcryptjs";
import { DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "../db";

const ACCESS_TOKEN_TTL = env.ACCESS_TOKEN_TTL;
const REFRESH_TOKEN_TTL = env.REFRESH_TOKEN_TTL;

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN" | "BANNED";
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   role: "USER" | "ADMIN" | "BANNED";
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "username..." },
        password: { label: "Password", type: "password..." },
      },

      async authorize(credentials) {
        const safeCredentials =
          await signInFormSchema.safeParseAsync(credentials);

        if (!safeCredentials.success) {
          return null;
        }

        const { name, password } = safeCredentials.data;

        const user = await db.user.findUnique({
          where: {
            name,
          },
          select: {
            id: true,
            name: true,
            password: true,
            email: true,
            role: true,
          },
        });

        if (!user) return null;

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      return token;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        token,
      };
    },
  },
} satisfies NextAuthConfig;
