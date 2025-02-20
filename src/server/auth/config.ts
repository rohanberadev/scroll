import { signInFormSchema } from "@/common/schema";
import { env } from "@/env";
import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
      image: string;
      emailVerified: Date;
    } & DefaultSession["user"];
  }

  interface User {
    role: "USER" | "ADMIN" | "BANNED";
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {}
// }

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
          throw new Error("Invalid input. Please check your credentials.");
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
            emailVerified: true,
            image: true,
          },
        });

        if (!user) {
          throw new Error("Invalid username or password.");
        }

        const matchPassword = await bcrypt
          .compare(password, user.password)
          .catch((error) => {
            console.error(
              "Error authenticating user while comparing passwords:",
              error,
            );
            throw new Error("Authentication failed. Please try again.");
          });

        if (!matchPassword) {
          throw new Error("Invalid username or password.");
        }

        // if (!user.emailVerified || user.emailVerified < new Date()) {
        //   await sendEmailVerification({
        //     userId: user.id,
        //     email: user.email,
        //     username: user.name,
        //   }).catch((error) => {
        //     console.error(
        //       "Error authenticating user while sending email verification job:",
        //       error,
        //     );
        //     throw new Error(
        //       "Unable to send verification email. Please try again later.",
        //     );
        //   });
        //   throw new Error(
        //     "Email not verified. A verification email has been sent to your inbox.",
        //   );
        // }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image ? user.image.fullPath : "",
        };
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // Ensure role is stored
          image: user.image ?? "", // Ensure image is defined
        };
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            ...token,
          },
        };
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
