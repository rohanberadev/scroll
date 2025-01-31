import { signUpFormSchema } from "@/common/schema";
import { publicProcedure, createTRPCRouter } from "@/server/api/trpc";

import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(signUpFormSchema).mutation(async function ({
    ctx,
    input,
  }) {
    const { name, email, password } = input;

    const hashedPassword = await bcrypt.hash(password, 10).catch((error) => {
      console.log(error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    });

    try {
      await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        console.log(error);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    return { success: "User is created!" };
  }),
});
