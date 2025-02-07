import { signUpFormSchema } from "@/common/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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

    return redirect("/sign-in");
  }),
});
