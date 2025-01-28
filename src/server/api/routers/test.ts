import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createPostFormSchema } from "@/common/schema";

export const testRouter = createTRPCRouter({
  generate: publicProcedure.query(async function* () {
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      yield i;
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async function ({ ctx, input }) {
      return { title: input.id };
    }),

  upload: publicProcedure.input(createPostFormSchema).mutation(async function ({
    ctx,
    input,
  }) {
    console.log(input);
    return { success: "Hey" };
  }),
});
