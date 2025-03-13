"use client";

import { getRecentMessages } from "@/app/(main)/messages/[username]/action";
import { cn } from "@/lib/utils";
import { type RouterOutputs, api as apiClient } from "@/trpc/react";
import { pusher } from "@/utils/pusher/client";
import { getPublicRoomId } from "@/utils/pusher/roomId";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
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
    RouterOutputs["message"]["recentMessagesOfUser"]["messages"][number];

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<MessageType[]>();
  const [nextCursor, setNextCursor] =
    useState<RouterOutputs["message"]["recentMessagesOfUser"]["nextCursor"]>();

  const { ref: inViewRef, inView } = useInView({ delay: 300 });

  const sendMessage = apiClient.message.create.useMutation();
  const roomId = getPublicRoomId(sessionUser.id, chatUser.id);

  useEffect(() => {
    const channel = pusher.subscribe(roomId);

    async function handleNewMessage(newMessage: MessageType) {
      setMessages((prev) => (prev ? [newMessage, ...prev] : [newMessage]));
    }

    channel.bind("message", handleNewMessage);

    return () => {
      channel.unbind("message", handleNewMessage);
      pusher.unsubscribe(roomId);
    };
  }, [messages, roomId, chatUser]);

  useEffect(() => {
    const messageEnd = document.getElementById("messageEnd");
    if (messageEnd && !inView) {
      messageEnd.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, inView]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getRecentMessages(chatUser.id, 10, undefined);
        setMessages(response.messages);
        setNextCursor(response.nextCursor);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages().catch((error) => console.error(error));
    return () => {
      setMessages(undefined);
      setNextCursor(undefined);
    };
  }, [chatUser.id]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getRecentMessages(chatUser.id, 10, nextCursor);
        setMessages((prev) =>
          prev ? [...prev, ...response.messages] : [...response.messages],
        );
        setNextCursor(response.nextCursor);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    if (nextCursor && chatUser.id && inView) {
      fetchMessages().catch((error) => console.error(error));
    }
  }, [inView, nextCursor, chatUser.id]);

  const reversedMessages = useMemo(
    () => messages?.slice().reverse(),
    [messages],
  );

  return (
    <>
      <div className="flex min-h-full flex-col gap-y-6 p-6" id="chatScreen">
        <div ref={inViewRef}></div>
        {reversedMessages?.map((message, index) => (
          <div
            key={index}
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
