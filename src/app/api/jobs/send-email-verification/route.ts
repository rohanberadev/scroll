import UserVerificationEmail from "@/components/email/UserVerificationEmail";
import { env } from "@/env";
import { db } from "@/server/db";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const jobRequestBody = z.object({
  userId: z.string().cuid(),
  username: z.string(),
  email: z.string().email(),
});

export const POST = verifySignatureAppRouter(async (request: NextRequest) => {
  try {
    const body = (await request.json()) as z.infer<typeof jobRequestBody>;
    const safeBody = await jobRequestBody.safeParseAsync(body);

    if (!safeBody.success) {
      return NextResponse.json(
        { error: "Invalid job schema" },
        { status: 400 },
      );
    }

    const { userId, username, email } = safeBody.data;

    const token = crypto.randomUUID();

    await db.verificationToken.create({
      data: {
        token,
        userId,
        expires: new Date(Date.now() + env.EMAIL_VERIFICATION_TOKEN_TTL * 1000),
      },
    });

    const verificationLink = `${env.NEXT_APP_URL}/verify-email?token=${token}`;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Email Verification",
      react: UserVerificationEmail({ userId, username, verificationLink }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
});
