import { env } from "@/env";
import { Client } from "@upstash/qstash";

const NEXT_APP_URL = env.NEXT_APP_URL;

const client = new Client({ token: env.QSTASH_TOKEN });

export function sendEmailVerification(args: {
  userId: string;
  username: string;
  email: string;
}) {
  const { userId, username, email } = args;

  return client.publishJSON({
    url: `${NEXT_APP_URL}/api/jobs/send-email-verification`,
    body: { userId, username, email },
  });
}
