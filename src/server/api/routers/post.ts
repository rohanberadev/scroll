import { createPostFormSchema } from "@/common/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostFormSchema)
    .mutation(async function ({ ctx, input }) {
      const { caption, media, postType } = input;

      // await ctx.db.post
      //   .create({
      //     data: {
      //       caption,
      //       type: postType,
      //       mediaUrls: media,
      //       postedById: ctx.user.id,
      //       updatedAt: new Date(),
      //     },
      //   })
      //   .catch((error: Error) => {
      //     console.error("Error creating post while storing in db:", error);
      //     throw new TRPCError({
      //       code: "INTERNAL_SERVER_ERROR",
      //       message: "Something went wrong!",
      //     });
      //   });

      return { success: "Post has been successfully uploaded" };
    }),
});
