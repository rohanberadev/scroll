export function getPublicRoomId(userId1: string, userId2: string) {
  return `public-chat-${[userId1, userId2].sort().join("-")}`;
}
