import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { fileRouter } from "@/server/api/routers/file";
import { postRouter } from "@/server/api/routers/post";
import { testRouter } from "@/server/api/routers/test";
import { userRouter } from "@/server/api/routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  test: testRouter,
  user: userRouter,
  post: postRouter,
  file: fileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
