import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const testRouter = createTRPCRouter({
  generate: publicProcedure.query(async function* () {
    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      yield i;
    }
  }),
});
