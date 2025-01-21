import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { signInFormSchema } from "@/common/schema";
import { db } from "@/server/db";
import bcrypt from "bcrypt";

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
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "username..." },
        password: { label: "Password", type: "password..." },
      },

      async authorize(credentials, request) {
        const creds = await signInFormSchema.safeParseAsync(credentials);

        if (!creds.success) {
          return null;
        }

        const { name, password } = creds.data;

        const user = await db.user.findFirst({
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
