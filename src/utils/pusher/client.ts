import { env } from "@/env";
import Pusher from "pusher-js";

Pusher.logToConsole = true;

export const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
