import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ postId: z.string().cuid(), content: z.string() }))
    .mutation(async function ({ ctx, input }) {
      const storedPost = await ctx.db.post
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
            ],
            NOT: [{ type: "ME" }],
          },
          select: { id: true, postedById: true },
        })
        .catch((error) => {
          console.error(
            "Error in creating comment while fetching post from db:",
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

      try {
        await ctx.db.$transaction([
          ctx.db.post.update({
            where: { id: storedPost.id },
            data: { comments: { increment: 1 } },
          }),
          ctx.db.comment.create({
            data: {
              postId: storedPost.id,
              commetedById: ctx.session.user.id,
              content: input.content,
              updatedAt: new Date(),
              parentId: null,
            },
          }),
        ]);
      } catch (error) {
        console.error(
          "Error in creating comment while storing comment in db:",
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

      return { success: "User has commented on the post" };
    }),

  getAllInfiniteCommentsByPostId: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      const storedPost = await ctx.db.post
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
            ],
            NOT: [{ type: "ME" }],
          },
          select: { id: true, postedById: true },
        })
        .catch((error) => {
          console.error(
            "Error in creating comment while fetching post from db:",
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

      try {
        return (
          await ctx.db.comment.findMany({
            where: { postId: storedPost.id },
            include: {
              commentedBy: {
                select: { image: { select: { publicUrl: true } }, name: true },
              },
              CommenLike: { select: { likedById: true } },
            },
            orderBy: { commentedAt: "desc" },
          })
        ).map(({ CommenLike, ...comment }) =>
          comment
            ? {
                ...comment,
                isLikedByUser: CommenLike.length > 0,
              }
            : null,
        );
      } catch (error) {
        console.error(
          "Error in getAllInfiniteCommentsByPostId while fetching comments from db:",
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
});
