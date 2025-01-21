import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .max(20, { message: "Name must contain at most 20 character(s)" })
    .refine((value) => !/[@#$%^&*()=+!:;'",/?`]/.test(value), {
      message: "Username contains disallowed characters",
    }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 3 character(s)" }),
  email: z
    .string()
    .toLowerCase()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
});

export const signInFormSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .max(20, { message: "Name must contain at most 20 character(s)" })
    .refine((value) => !/[@#$%^&*()=+!:;'",/?`]/.test(value), {
      message: "Username contains disallowed characters",
    }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 3 character(s)" }),
});
