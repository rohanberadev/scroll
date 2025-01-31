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

import { api } from "@/trpc/react";
import { signInFormSchema, signUpFormSchema } from "@/common/schema";

import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  formButtonLabel: string;
};

function SignInForm({ formButtonLabel }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const formValues = form.watch();

  async function onSubmit() {
    setLoading(true);
    setError("");
    setSuccess("");

    const response = await signIn("credentials", {
      redirect: false,
      ...formValues,
    });

    if (response?.error) {
      setError(response.error);
    } else {
      form.reset();
      setSuccess("User is logged in");
      router.push("/");
    }

    setLoading(false);
  }

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

        {error && <FormMessage>Invalid Credentials!</FormMessage>}

        <Button
          type="submit"
          className="transition-colors duration-500 hover:bg-stone-200 hover:text-black"
          disabled={loading}
        >
          {loading ? <ClipLoader size={24} color="white" /> : formButtonLabel}
        </Button>
      </form>
    </Form>
  );
}

function SignUpForm({ formButtonLabel }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const formValues = form.watch();

  const createUser = api.user.create.useMutation({
    onMutate() {
      setLoading(true);
    },

    onSuccess(opts) {
      setLoading(false);
      setSuccess(opts.success);
      form.reset();
    },

    onError(opts) {
      setLoading(false);
      setError(opts.message);
      form.reset();
    },
  });

  async function onSubmit() {
    try {
      await createUser.mutateAsync(formValues);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
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

        {error && <FormMessage>{error}</FormMessage>}

        <Button
          type="submit"
          className="transition-colors duration-500 hover:bg-stone-200 hover:text-black"
          disabled={loading}
        >
          {loading ? <ClipLoader size={24} color="white" /> : formButtonLabel}
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
