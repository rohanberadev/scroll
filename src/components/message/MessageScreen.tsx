"use client";

import { pusher } from "@/utils/pusher/client";

export default function MessageScreen() {
  const channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data: unknown) {
    console.log(data);
  });
  return <div className="h-[3000px]"></div>;
}
