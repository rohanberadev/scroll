import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { supabase } from "@/server/supabase/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const fileRouter = createTRPCRouter({
  getSignedUploadUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        bucket: z.enum(["post-public", "post-private", "post-draft"]),
      }),
    )
    .query(async function ({ ctx, input }) {
      const { filename, bucket } = input;

      const storedUser = await ctx.db.user.findFirst({
        where: { id: ctx.session.user.id },
        select: { id: true, name: true, role: true },
      });

      if (!storedUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User does not exist!",
        });
      }

      if (storedUser.role === "BANNED") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authorized to access this resource!",
        });
      }

      const filepath = `${storedUser.name}/${filename}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUploadUrl(filepath);

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),

  getPrivateSignedUrl: protectedProcedure
    .input(
      z.object({
        path: z.string(),
        bucket: z.enum(["post-private", "post-public", "post-draft"]),
        postId: z.string().cuid(),
      }),
    )
    .query(async function ({ ctx, input }) {
      const { postId } = input;

      const storedPost = await ctx.db.post.findFirst({
        where: {
          id: postId,
          postedBy: {
            Following: { some: { followedToId: ctx.session.user.id } },
          },
        },
      });
    }),
});
