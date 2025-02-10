import "server-only";

import { env } from "@/env";
import { db } from "@/server/db";
import { encode } from "next-auth/jwt";

export function getAccessToken(userId: string) {
  return encode({
    token: { userId },
    secret: env.AUTH_SECRET,
    salt: env.AUTH_SALT,
  });
}

export function getRefreshToken(userId: string) {
  return encode({
    token: { userId },
    secret: env.AUTH_SECRET,
    salt: env.AUTH_SALT,
  });
}

export function storeRefreshToken(token: string, userId: string, ttl: number) {
  return db.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + ttl),
    },
  });
}

export async function refreshAccessToken(refreshToken: string) {
  const storedToken = await db.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken) {
    return null;
  }

  if (storedToken.expiresAt < new Date()) {
    return null;
  }

  const [newAccessToken, newRefreshToken] = await Promise.all([
    getAccessToken(storedToken.userId),
    getRefreshToken(storedToken.userId),
  ]);

  await Promise.all([
    db.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: storedToken.userId,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_TTL),
      },
    }),
    db.refreshToken.delete({ where: { id: storedToken.id } }),
  ]);

  return {
    newAccessToken,
    newRefreshToken,
  };
}
