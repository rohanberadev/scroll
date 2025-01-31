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

// export const createPostFormSchema = z.object({
//   caption: z
//     .string()
//     .min(3, { message: "Description should be atleast 3 character(s) long." }),
//   media: z
//     .instanceof(FileList, {
//       message: "Please select a file.",
//     })
//     .refine((files) => files.length <= 5, {
//       message: "You can only upload up to 5 files in a post.",
//     })
//     .refine(
//       (files) => {
//         for (const file of files) {
//           return file.size <= 1024 * 1024 * 5;
//         }
//       },
//       { message: "File size must be smaller than 5MB." },
//     )
//     .refine(
//       (files) => {
//         for (const file of files) {
//           return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
//         }
//       },
//       { message: "Only PNG, JPG and JPEG files are allowed." },
//     ),
// });
