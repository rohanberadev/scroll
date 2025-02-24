import { signUpFormSchema } from "@/common/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { sendEmailVerification } from "@/server/jobs/send-email";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(signUpFormSchema).mutation(async function ({
    ctx,
    input,
  }) {
    const { name, email, password } = input;

    const [userByEmail, userByName] = await Promise.all([
      ctx.db.user.findUnique({ where: { email } }),
      ctx.db.user.findUnique({ where: { name } }),
    ]);

    if (userByEmail) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email has been already use!",
      });
    }

    if (userByName) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Username is already taken!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10).catch((error) => {
      console.error("Error creating user while hashing password:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    });

    const user = await ctx.db.user
      .create({
        data: {
          name,
          email,
          password: hashedPassword,
          updatedAt: new Date(),
        },
      })
      .catch((error) => {
        console.error("Error creating user while storing user in db:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      });

    await sendEmailVerification({
      userId: user.id,
      username: user.name,
      email: user.email,
    }).catch((error) => {
      console.error("Error creating user while sending email job:", error);
    });

    return {
      success: "User is created",
    };
  }),

  getUserByUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { session } = ctx;
      const { username } = input;

      const storedUser = [
        await ctx.db.user
          .findFirst({
            where: { name: username },
            include: {
              Following: {
                select: { followedById: true },
                where: { followedById: session.user.id },
              },
            },
          })
          .catch((error) => {
            console.error("Error fetching user from db:", error);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Something went wrong!",
            });
          }),
      ].map((user) =>
        user
          ? {
              ...user,
              password: "",
              isProfileOwner: user.id === session.user.id,
              isFollowedByUser: user.Following.length > 0,
              Following: null,
            }
          : null,
      );

      if (!storedUser || storedUser.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found!" });
      }

      return storedUser[0];
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string().uuid(),
      }),
    )
    .query(async function ({ input, ctx }) {
      const { token } = input;

      const storedToken = await ctx.db.verificationToken
        .findUnique({
          where: { token },
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wront!",
          });
        });

      if (!storedToken) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token!" });
      }

      if (storedToken.expires < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token has been expired!",
        });
      }

      try {
        await Promise.all([
          ctx.db.verificationToken.delete({ where: { token } }),
          ctx.db.user.update({
            where: { id: storedToken.userId },
            data: {
              emailVerified: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
            },
          }),
        ]);

        return { success: "Email has been successfully verified" };
      } catch (error) {
        console.error("Error verifying email:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      }
    }),

  follow: protectedProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      const { userId } = input;

      const storedUser = await ctx.db.user
        .findFirst({
          where: {
            id: userId,
          },
          include: {
            Follower: {
              select: { followedById: true },
              where: { followedById: ctx.session.user.id },
            },
          },
        })
        .catch((error) => {
          console.error(
            "Error in follow user while fecthing user from db:",
            error,
          );
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong!",
          });
        });

      if (!storedUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found!" });
      }

      if (storedUser.Follower.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You are already following the user!",
        });
      }

      if (storedUser.type === "PRIVATE") {
        const followRequest = await ctx.db.followRequest.findUnique({
          where: {
            requestedById_requestedToId: {
              requestedById: ctx.session.user.id,
              requestedToId: userId,
            },
          },
        });

        if (followRequest) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Follow request already exist",
          });
        }

        // TODO: send follow request notification

        return { success: "Follow request has been send" };
      } else {
        await ctx.db.$transaction([
          ctx.db.user.update({
            where: { id: userId },
            data: { followers: { increment: 1 } },
          }),

          ctx.db.user.update({
            where: { id: ctx.session.user.id },
            data: { following: { increment: 1 } },
          }),

          ctx.db.follower.create({
            data: {
              followedById: ctx.session.user.id,
              followedToId: userId,
            },
          }),
        ]);
      }

      return { success: `You are now following ${storedUser.name}` };
    }),
});
