import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pusher } from "@/utils/pusher/server";
import { z } from "zod";

export const testRouter = createTRPCRouter({
  generate: publicProcedure.query(async function* () {
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      yield i;
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async function ({ input }) {
      return { title: input.id };
    }),

  hey: publicProcedure.mutation(async function () {
    await pusher.trigger("my-channel", "my-event", {
      message: "hello from server",
    });

    return { success: "Hey" };
  }),
});
