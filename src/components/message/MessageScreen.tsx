"use client";

import { getRecentMessages } from "@/app/(main)/messages/[username]/action";
import { cn } from "@/lib/utils";
import { type RouterOutputs, api as apiClient } from "@/trpc/react";
import { pusher } from "@/utils/pusher/client";
import { getPublicRoomId } from "@/utils/pusher/roomId";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import InputMessageBox from "./InputMessageBox";

export default function MessageScreen({
  sessionUser,
  chatUser,
}: {
  sessionUser: {
    id: string;
    name: string;
    image: string;
  };
  chatUser: {
    id: string;
    name: string;
  };
}) {
  type MessageType =
    RouterOutputs["message"]["recentMessagesOfUser"]["messages"];

  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["messages", chatUser.id],
    queryFn: async () => {
      const response = await getRecentMessages(chatUser.id, 10, nextCursor);
      setNextCursor(response.nextCursor);
      return response.messages;
    },
    initialData: undefined,
    enabled: Boolean(chatUser.id),
  });

  const sendMessage = apiClient.message.create.useMutation();
  const roomId = getPublicRoomId(sessionUser.id, chatUser.id);
  const [nextCursor, setNextCursor] =
    useState<RouterOutputs["message"]["recentMessagesOfUser"]["nextCursor"]>();

  useEffect(() => {
    const channel = pusher.subscribe(roomId);

    const handleNewMessage = (newMessage: MessageType[0]) => {
      console.log("message: ", newMessage);
      queryClient.setQueryData(
        ["messages", chatUser.id],
        (oldData?: MessageType) => {
          if (!oldData) return [newMessage];
          return [newMessage, ...oldData];
        },
      );
    };

    channel.bind("message", handleNewMessage);

    return () => {
      channel.unbind("message", handleNewMessage);
      pusher.unsubscribe(roomId);
    };
  }, [queryClient, roomId, chatUser]);

  useEffect(() => {
    const messageEnd = document.getElementById("messageEnd");
    if (messageEnd) {
      messageEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  const messages = useMemo(() => data?.slice().reverse(), [data]);

  return (
    <>
      <div className="flex min-h-full flex-col gap-y-6 p-6" id="chatScreen">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex max-h-[1000px] w-[300px] flex-col justify-center text-wrap rounded-lg px-4 py-2",
              message.sentByUserId === sessionUser.id
                ? "self-end bg-blue-600"
                : "self-start bg-stone-900",
            )}
          >
            <span className="text-sm">
              {message.sentByUserId === sessionUser.id
                ? "You: "
                : `${chatUser.name}: `}
            </span>
            <p className="text-wrap break-words">{message.content}</p>
            <span className="self-end text-xs">
              {new Date(message.sentAt).toDateString()}
            </span>
          </div>
        ))}
        <div id="messageEnd" />
      </div>
      <InputMessageBox
        onSubmit={async (content: string) => {
          await sendMessage.mutateAsync({ content, username: chatUser.name });
          setContent("");
        }}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        buttonDisabled={sendMessage.isPending}
      />
    </>
  );
}
