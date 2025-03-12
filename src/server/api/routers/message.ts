import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getPublicRoomId } from "@/utils/pusher/roomId";
import { pusher } from "@/utils/pusher/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ content: z.string().trim().min(1), username: z.string() }),
    )
    .mutation(async function ({ ctx, input }) {
      const storedUser = await ctx.db.user.findFirst({
        where: {
          name: input.username,
          Following: { some: { followerId: ctx.session.user.id } },
        },
        select: { id: true },
      });

      if (!storedUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const newMessage = await ctx.db.message.create({
        data: {
          sentByUserId: ctx.session.user.id,
          recievedByUserId: storedUser.id,
          updatedAt: new Date(),
          content: input.content,
        },
      });

      const roomId = getPublicRoomId(storedUser.id, ctx.session.user.id);
      await pusher.trigger(roomId, "message", newMessage);

      return newMessage;
    }),

  recentMessagesOfUser: protectedProcedure
    .input(
      z.object({ userId: z.string().cuid(), limit: z.number().default(10) }),
    )
    .query(async function ({ ctx, input }) {
      const storedUser = await ctx.db.user.findFirst({
        where: {
          id: input.userId,
          Following: { some: { followerId: ctx.session.user.id } },
        },
        select: { id: true },
      });

      if (!storedUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      return await ctx.db.message.findMany({
        where: {
          OR: [
            {
              sentByUserId: ctx.session.user.id,
              recievedByUserId: storedUser.id,
            },
            {
              sentByUserId: storedUser.id,
              recievedByUserId: ctx.session.user.id,
            },
          ],
        },
        take: input.limit,
        orderBy: { sentAt: "desc" },
      });
    }),

  getUser: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async function ({ ctx, input }) {
      return ctx.db.user.findFirst({
        where: {
          name: input.username,
          OR: [
            { Following: { some: { followerId: ctx.session.user.id } } },
            { Follower: { some: { followingId: ctx.session.user.id } } },
          ],
        },
        select: {
          id: true,
          name: true,
          image: {
            select: { publicUrl: true },
          },
        },
      });
    }),
});
