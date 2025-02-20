import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .max(20, { message: "Name must contain at most 20 character(s)" })
    .refine((value) => !/[@#$%^&*()=+!:;'",/?\s``]/.test(value), {
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
    .refine((value) => !/[@#$%^&*()=+!:;'",/?\s`]/.test(value), {
      message: "Username contains disallowed characters",
    }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 3 character(s)" }),
});

export const createPostFormSchema = z.object({
  caption: z
    .string()
    .min(3, { message: "Description should be atleast 3 character(s) long." }),
  media: z
    .array(z.object({ id: z.string(), path: z.string(), fullPath: z.string() }))
    .min(1, { message: "Atleast one media url should be there" })
    .max(5, { message: "Atmost 5 media urls are allowed" })
    .default([]),
  postType: z.enum(["DRAFT", "PUBLIC", "PRIVATE"]),
});
