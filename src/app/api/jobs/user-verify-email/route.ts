import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { type NextRequest, NextResponse } from "next/server";

type JobRequestBody = {
  jobId: string;
};

export const POST = verifySignatureAppRouter(async (request: NextRequest) => {
  const body = (await request.json()) as JobRequestBody;
  console.log(body);

  return NextResponse.json({ success: "Hello from jobs" });
});
