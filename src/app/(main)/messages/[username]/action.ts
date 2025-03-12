"use server";

import { api } from "@/trpc/server";

export async function getRecentMessages(userId: string, limit: number) {
  return api.message.recentMessagesOfUser({
    userId,
    limit,
  });
}
