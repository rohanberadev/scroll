"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  formButtonLabel: String;
};

const signInFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .max(20, { message: "Name must contain at most 20 character(s)" })
    .refine((value) => !/[@#$%^&*()=+!:;'",/?`]/.test(value), {
      message: "Username contains disallowed characters",
    }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 3 character(s)" }),
});

const signUpFormSchema = signInFormSchema.extend({
  email: z.string().email(),
});

function SignInForm({ formButtonLabel }: Props) {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  function onSubmit() {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name..." {...field} />
              </FormControl>
              <FormDescription>This is your public username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password..." {...field} />
              </FormControl>
              <FormDescription>
                This is your password for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="transition-colors duration-500 hover:bg-stone-200 hover:text-black"
        >
          {formButtonLabel}
        </Button>
      </form>
    </Form>
  );
}

function SignUpForm({ formButtonLabel }: Props) {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  function onSubmit() {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name..." {...field} />
              </FormControl>
              <FormDescription>This is your public username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} />
              </FormControl>
              <FormDescription>
                This is your email for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password..." {...field} />
              </FormControl>
              <FormDescription>
                This is your password for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="transition-colors duration-500 hover:bg-stone-200 hover:text-black"
        >
          {formButtonLabel}
        </Button>
      </form>
    </Form>
  );
}

export default function AuthForm({ formButtonLabel }: Props) {
  return formButtonLabel.toLowerCase() === "sign up" ? (
    <SignUpForm formButtonLabel={formButtonLabel} />
  ) : (
    <SignInForm formButtonLabel={formButtonLabel} />
  );
}
