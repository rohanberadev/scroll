import { signUpFormSchema } from "@/common/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
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

    // await sendEmailVerification({
    //   userId: user.id,
    //   username: user.name,
    //   email: user.email,
    // }).catch((error) => {
    //   console.error("Error creating user while sending email job:", error);
    // });

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
                select: { followerId: true },
                where: { followerId: session.user.id },
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
              select: { followerId: true },
              where: { followerId: ctx.session.user.id },
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

      if (storedUser.followPermission) {
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

          ctx.db.follow.create({
            data: {
              followerId: ctx.session.user.id,
              followingId: userId,
            },
          }),
        ]);
      }

      return { success: `You are now following ${storedUser.name}` };
    }),

  getMyAllTypeInfinitePosts: protectedProcedure.query(async function ({ ctx }) {
    try {
      return await ctx.db.post.findMany({
        where: { postedById: ctx.session.user.id, type: "ALL" },
        select: {
          files: { take: 1, orderBy: { createdAt: "asc" } },
          likes: true,
          comments: true,
          id: true,
        },
      });
    } catch (error) {
      console.error(
        "Error in getMyAllTypeInfinitePosts while fetching posts:",
        error,
      );
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }
  }),

  getMyFollowerTypeInfinitePosts: protectedProcedure.query(async function ({
    ctx,
  }) {
    try {
      return await ctx.db.post.findMany({
        where: { postedById: ctx.session.user.id, type: "FOLLOWER" },
        select: {
          files: { take: 1, orderBy: { createdAt: "asc" } },
          likes: true,
          comments: true,
          id: true,
        },
      });
    } catch (error) {
      console.error(
        "Error in getMyFollowerTypeInfinitePosts while fetching posts:",
        error,
      );
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }
  }),

  getMyMeTypeInfinitePosts: protectedProcedure.query(async function ({ ctx }) {
    try {
      return await ctx.db.post.findMany({
        where: { postedById: ctx.session.user.id, type: "ME" },
        select: {
          files: { take: 1, orderBy: { createdAt: "asc" } },
          likes: true,
          comments: true,
          id: true,
        },
      });
    } catch (error) {
      console.error(
        "Error in getMyMeTypeInfinitePosts while fetching posts:",
        error,
      );
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }
  }),

  getTopInfinitePeople: protectedProcedure.query(async function ({ ctx }) {
    try {
      return (
        await ctx.db.user.findMany({
          where: {
            NOT: [{ id: ctx.session.user.id }],
          },

          select: {
            id: true,
            name: true,
            followers: true,
            Following: {
              select: { followerId: true },
              where: { followerId: ctx.session.user.id },
            },
            image: {
              select: { publicUrl: true },
            },
          },
          orderBy: [
            { createdAt: "desc" },
            { followers: "desc" },
            { posts: "desc" },
          ],
        })
      ).map(({ Following, ...user }) =>
        user
          ? {
              ...user,
              isFollowedByUser: Following.length > 0,
            }
          : null,
      );
    } catch (error) {
      console.error(
        "Error in getTopInfinitePeople while fecthing from db:",
        error,
      );
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }
  }),

  searchPeopleByUsername: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async function ({ ctx, input }) {
      try {
        return (
          await ctx.db.user.findMany({
            where: {
              name: { contains: input.query, mode: "insensitive" },
              NOT: { id: ctx.session.user.id },
            },
            select: {
              id: true,
              name: true,
              followers: true,
              Following: {
                select: { followerId: true },
                where: { followerId: ctx.session.user.id },
              },
              image: {
                select: { publicUrl: true },
              },
            },
          })
        ).map(({ Following, ...user }) =>
          user
            ? {
                ...user,
                isFollowedByUser: Following.length > 0,
              }
            : null,
        );
      } catch (error) {
        console.error(
          "Error in searchPeopleByUsername while fecthing from db:",
          error,
        );
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      }
    }),

  getInfiniteFollowersAndFollowingUsers: protectedProcedure.query(
    async function ({ ctx }) {
      try {
        return ctx.db.user.findFirst({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            Following: {
              select: {
                followerId: true,
                followingUser: {
                  select: {
                    id: true,
                    name: true,
                    image: { select: { publicUrl: true } },
                  },
                },
              },
              where: { followerId: ctx.session.user.id },
            },
          },
        });
      } catch (error) {
        console.error(
          "Error in getInfiniteFollowersAndFollowingUsers while fecthing from db:",
          error,
        );
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      }
    },
  ),

  toggleFollowPermission: protectedProcedure.mutation(async function ({ ctx }) {
    try {
      return await ctx.db.$transaction(async (trx) => {
        const data = await trx.user.findFirst({
          where: { id: ctx.session.user.id },
          select: { followPermission: true },
        });

        if (data === null) {
          throw new Error("Failed to toggle follow permission");
        }

        await trx.user.update({
          where: { id: ctx.session.user.id },
          data: { followPermission: !data.followPermission },
        });

        return !data.followPermission;
      });
    } catch (error) {
      console.error(
        "Error in toggleFollowPermission while storing in db:",
        error,
      );
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }
  }),

  getMe: protectedProcedure.query(async function ({ ctx }) {
    try {
      return ctx.db.user.findFirst({
        where: { id: ctx.session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          followPermission: true,
        },
      });
    } catch (error) {
      console.error("Error in getMe while fetching from db:", error);
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }
  }),
});
