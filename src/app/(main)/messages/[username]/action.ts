"use server";

import { type RouterOutputs } from "@/trpc/react";
import { api } from "@/trpc/server";

export async function getRecentMessages(
  userId: string,
  limit: number,
  nextCursor: RouterOutputs["message"]["recentMessagesOfUser"]["nextCursor"],
) {
  return api.message.recentMessagesOfUser({
    userId,
    limit,
    cursor: nextCursor,
  });
}
