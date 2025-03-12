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
      z.object({
        userId: z.string().cuid(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z
          .object({
            id: z.string(),
            sentAt: z.date(),
          })
          .nullish(),
      }),
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

      const limit = input.limit ?? 10;

      const messages = await ctx.db.message.findMany({
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
        take: limit + 1,
        cursor: input.cursor ? { id_sentAt: { ...input.cursor } } : undefined,
        orderBy: [{ sentAt: "desc" }, { id: "desc" }],
      });

      let nextCursor: typeof input.cursor | undefined;
      if (messages.length > limit) {
        const nextMessage = messages.pop();
        if (nextMessage) {
          nextCursor = { sentAt: nextMessage.sentAt, id: nextMessage.id };
        }
      }

      return { messages, nextCursor };
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
