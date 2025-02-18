import { createPostFormSchema } from "@/common/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostFormSchema)
    .mutation(async function ({ ctx, input }) {
      const { caption, media, postType } = input;
      console.log(ctx.user);

      if (media.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "" });
      }

      try {
        await ctx.db.$transaction(async (tx) => {
          const post = await tx.post.create({
            data: {
              postedById: ctx.user.id,
              caption,
              type: postType,
              updatedAt: new Date(),
            },
          });

          await tx.file.createMany({
            data: media.map((m) => ({ ...m, postId: post.id })),
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
});
