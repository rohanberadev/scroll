import { signUpFormSchema } from "@/common/schema";
import { env } from "@/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Client } from "@upstash/qstash";
import bcrypt from "bcryptjs";

const client = new Client({ token: env.QSTASH_TOKEN });

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(signUpFormSchema).mutation(async function ({
    ctx,
    input,
  }) {
    const { name, email, password } = input;

    const [userByEmail, userByName] = await Promise.all([
      ctx.db.user.findUnique({ where: { email } }),
      ctx.db.user.findUnique({ where: { name } }),
    ]);

    if (userByEmail) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email has been already use!",
      });
    }

    if (userByName) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username is already taken!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10).catch((error) => {
      console.log(error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    });

    await ctx.db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    const sendEmailJob = await client.publishJSON({
      url: `${env.NEXT_APP_URL}/api/jobs/user-verify-email`,
      body: { jobId: "123" },
    });

    console.log(sendEmailJob.messageId);

    return {
      success: "User is created.",
      qstashMessageId: sendEmailJob.messageId,
    };
  }),

  getUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),
});
