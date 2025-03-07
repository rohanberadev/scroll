import { createPostFormSchema } from "@/common/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { supabase } from "@/server/supabase/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostFormSchema)
    .mutation(async function ({ ctx, input }) {
      const { caption, postType } = input;
      let { media } = input;

      if (media.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "" });
      }

      const storedUser = await ctx.db.user
        .findFirst({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            id: true,
            role: true,
            name: true,
          },
        })
        .catch((error) => {
          console.error(
            "Error creating post while fetching user from db:",
            error,
          );
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        });

      if (!storedUser) {
        throw new TRPCError({ code: "CONFLICT", message: "User not found." });
      }

      if (storedUser.role === "BANNED") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authorized to access this resource!",
        });
      }

      if (postType === "ALL" || postType === "FOLLOWER") {
        media = media.map((m) => {
          const { data } = supabase.storage
            .from("post-public")
            .getPublicUrl(m.path);
          return { ...data, ...m };
        });
      }

      try {
        await ctx.db.$transaction(async (tx) => {
          const post = await tx.post.create({
            data: {
              postedById: storedUser.id,
              caption,
              type: postType,
              updatedAt: new Date(),
            },
          });

          await tx.file.createMany({
            data: media.map((m) => ({ ...m, postId: post.id })),
          });

          await tx.user.update({
            where: { id: storedUser.id },
            data: { posts: { increment: 1 } },
          });
        });
      } catch (error) {
        console.error("Error creating post while storing in db:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      return { success: "Post has been successfully uploaded" };
    }),

  infiniteLatestPosts: protectedProcedure.query(async function ({ ctx }) {
    return (
      await ctx.db.post.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  type: "ALL",
                },
                {
                  type: "FOLLOWER",
                  postedBy: {
                    Following: { some: { followerId: ctx.session.user.id } },
                  },
                },
              ],
            },
            { NOT: { postedById: ctx.session.user.id } },
          ],
        },
        include: {
          files: true,
          postedBy: {
            select: {
              name: true,
              Following: {
                select: { followerId: true },
                where: { followerId: ctx.session.user.id },
              },
            },
          },
          Like: {
            select: { likedById: true },
            where: { likedById: ctx.session.user.id },
          },
          SavedPost: {
            select: { savedById: true },
            where: { savedById: ctx.session.user.id },
          },
        },
        orderBy: { postedAt: "desc" },
        take: 10,
      })
    ).map(({ SavedPost, Like, ...post }) => ({
      ...post,
      postedBy: {
        name: post.postedBy.name,
        isFollowedByUser: post.postedBy.Following.length > 0,
      },
      isPostOwner: post.postedById === ctx.session.user.id,
      isLikedByUser: Like.length > 0,
      isSavedByUser: SavedPost.length > 0,
    }));
  }),

  getPostById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      const { id } = input;

      const storedPost = [
        await ctx.db.post
          .findFirst({
            where: {
              id,
              OR: [
                { type: "ALL" },
                {
                  type: "FOLLOWER",
                  postedBy: {
                    Following: { some: { followerId: ctx.session.user.id } },
                  },
                },
                {
                  type: "FOLLOWER",
                  postedById: ctx.session.user.id,
                },
                {
                  type: "ME",
                  postedById: ctx.session.user.id,
                },
              ],
            },
            include: {
              files: true,
              postedBy: {
                select: {
                  name: true,
                  Following: {
                    select: { followerId: true },
                    where: { followerId: ctx.session.user.id },
                  },
                },
              },
              Like: {
                select: { likedById: true },
                where: { likedById: ctx.session.user.id },
              },
              SavedPost: {
                select: { savedById: true },
                where: { savedById: ctx.session.user.id },
              },
            },
          })
          .catch((error) => {
            console.error(
              "Error in getPostById while fecthing post from db:",
              error,
            );
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Something went worng!",
            });
          }),
      ].map((post) =>
        post
          ? {
              ...post,
              postedBy: {
                name: post.postedBy.name,
                isFollowedByUser: post.postedBy.Following.length > 0,
              },
              isLikedByUser: post.Like.length > 0,
              isPostOwner: post.postedById === ctx.session.user.id,
              isSavedByUser: post.SavedPost.length > 0,
            }
          : null,
      );

      if (!storedPost || storedPost.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found!" });
      }

      return storedPost[0];
    }),

  getInfinitePostsOfUser: protectedProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      try {
        return await ctx.db.post.findMany({
          where: {
            postedById: input.userId,
            OR: [
              { type: "ALL" },
              {
                type: "FOLLOWER",
                postedBy: {
                  Following: { some: { followerId: ctx.session.user.id } },
                },
              },
            ],
          },
          select: {
            files: { take: 1, orderBy: { createdAt: "asc" } },
            likes: true,
            comments: true,
            id: true,
          },
        });
      } catch (error) {
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

  toggleLike: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      const { postId } = input;

      const storedPost = await ctx.db.post
        .findFirst({ where: { id: postId } })
        .catch((error) => {
          console.error(
            "Error in toggleLike post while fetching post from db:",
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
        });

      if (!storedPost) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found!" });
      }

      const storedLike = await ctx.db.like.findUnique({
        where: { likedById_postId: { postId, likedById: ctx.session.user.id } },
      });

      if (storedLike) {
        // Unlike the post
        try {
          await ctx.db.$transaction([
            ctx.db.post.update({
              where: { id: postId },
              data: { likes: { decrement: 1 } },
            }),
            ctx.db.like.delete({
              where: {
                likedById_postId: { postId, likedById: ctx.session.user.id },
              },
            }),
          ]);
        } catch (error) {
          console.error(
            "Error in toggleLike post while storing like in db:",
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
        return { success: -1 };
      } else {
        // Like the post
        try {
          await ctx.db.$transaction([
            ctx.db.post.update({
              where: { id: postId },
              data: { likes: { increment: 1 } },
            }),
            ctx.db.like.create({
              data: { likedById: ctx.session.user.id, postId },
            }),
          ]);
        } catch (error) {
          console.error(
            "Error in toggleLike post while storing like in db:",
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
        return { success: +1 };
      }
    }),

  getInfiniteTopPosts: protectedProcedure.query(async function ({ ctx }) {
    try {
      return await ctx.db.post.findMany({
        where: {
          OR: [
            { type: "ALL" },
            {
              type: "FOLLOWER",
              postedBy: {
                Following: { some: { followerId: ctx.session.user.id } },
              },
            },
          ],
          NOT: [{ postedById: ctx.session.user.id }],
        },
        select: {
          files: { take: 1, orderBy: { createdAt: "asc" } },
          likes: true,
          comments: true,
          id: true,
        },
        orderBy: { likes: "desc" },
      });
    } catch (error) {
      console.error(
        "Error in getInfiniteTopPosts post while fetching post from db:",
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

  getLikeCount: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      const post = await ctx.db.post
        .findFirst({
          where: {
            id: input.postId,
            OR: [
              { type: "ALL" },
              {
                type: "FOLLOWER",
                postedBy: {
                  Following: { some: { followerId: ctx.session.user.id } },
                },
              },
              {
                type: "FOLLOWER",
                postedById: ctx.session.user.id,
              },
              {
                type: "ME",
                postedById: ctx.session.user.id,
              },
            ],
          },
          select: { likes: true },
        })
        .catch((error) => {
          console.error(
            "Error in getLikeCount post while fetching post from db:",
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
        });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found!" });
      }

      return post.likes;
    }),

  getCommentCount: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      const post = await ctx.db.post
        .findFirst({
          where: {
            id: input.postId,
            OR: [
              { type: "ALL" },
              {
                type: "FOLLOWER",
                postedBy: {
                  Following: { some: { followerId: ctx.session.user.id } },
                },
              },
              {
                type: "FOLLOWER",
                postedById: ctx.session.user.id,
              },
              {
                type: "ME",
                postedById: ctx.session.user.id,
              },
            ],
          },
          select: { comments: true },
        })
        .catch((error) => {
          console.error(
            "Error in getLikeCount post while fetching post from db:",
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
        });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found!" });
      }

      return post.comments;
    }),

  toggleSavePost: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      const storedPost = await ctx.db.post.findFirst({
        where: {
          id: input.postId,
          OR: [
            { type: "ALL" },
            {
              type: "FOLLOWER",
              postedBy: {
                Following: { some: { followerId: ctx.session.user.id } },
              },
            },
            { type: "ME", postedById: ctx.session.user.id },
          ],
        },
        select: { id: true },
      });

      if (!storedPost) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      const existingSave = await ctx.db.savedPost.findUnique({
        where: {
          savedById_postId: {
            savedById: ctx.session.user.id,
            postId: input.postId,
          },
        },
        select: { id: true },
      });

      if (existingSave) {
        // Unsave the post
        await ctx.db.savedPost.delete({ where: { id: existingSave.id } });
        return false;
      } else {
        // Save the post
        await ctx.db.savedPost.create({
          data: { savedById: ctx.session.user.id, postId: storedPost.id },
        });
        return true;
      }
    }),
});
