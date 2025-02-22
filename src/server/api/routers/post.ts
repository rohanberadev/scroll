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

      if (postType === "PUBLIC") {
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
    const { session } = ctx;

    return (
      await ctx.db.post.findMany({
        where: {
          AND: [
            {
              OR: [
                { type: "PUBLIC" },
                {
                  type: "PRIVATE",
                  postedBy: {
                    Following: { some: { followedToId: session.user.id } },
                  },
                },
              ],
            },
            { NOT: { postedById: session.user.id } },
          ],
        },
        include: {
          files: true,
          postedBy: {
            select: {
              name: true,
              Follower: {
                select: { followedById: true },
                where: { followedById: session.user.id },
              },
            },
          },
          Like: {
            select: { likedById: true },
            where: { likedById: session.user.id },
          },
        },
        orderBy: { postedAt: "desc" },
        take: 10,
      })
    ).map((post) => ({
      ...post,
      postedBy: {
        name: post.postedBy.name,
        isFollowedByUser: post.postedBy.Follower.length > 0,
      },
      isPostOwner: post.postedById === ctx.session.user.id,
      isLikedByUser: post.Like.length > 0,
    }));
  }),

  getPostById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      const { id } = input;
      const { session } = ctx;

      const storedPost = [
        await ctx.db.post
          .findFirst({
            where: {
              id,
              OR: [
                { type: "PUBLIC" },
                {
                  type: "PRIVATE",
                  postedBy: {
                    Following: { some: { followedToId: session.user.id } },
                  },
                },

                {
                  type: "DRAFT",
                  postedById: session.user.id,
                },
              ],
            },
            include: {
              files: true,
              postedBy: {
                select: {
                  name: true,
                  Follower: {
                    select: { followedById: true },
                    where: { followedById: session.user.id },
                  },
                },
              },
              Like: {
                select: { likedById: true },
                where: { likedById: session.user.id },
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
                isFollowedByUser:
                  post.postedBy.Follower.length > 0 ||
                  post.postedById === ctx.session.user.id,
              },
              isLikedByUser: post.Like.length > 0,
              isPostOwner: post.postedById === ctx.session.user.id,
            }
          : null,
      );

      if (!storedPost || storedPost.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found!" });
      }

      return storedPost[0];
    }),
});
