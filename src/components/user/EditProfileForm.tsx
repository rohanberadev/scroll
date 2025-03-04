"use client";

import { editProfileFormSchema } from "@/common/schema";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import type { RouterOutputs } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export default function EditProfileForm({
  user,
}: {
  user: NonNullable<RouterOutputs["user"]["getMe"]>;
}) {
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      email: user.email,
      password: "",
      followPermission: user.followPermission,
    },
  });

  function onSubmit(data: z.infer<typeof editProfileFormSchema>) {
    // TODO: Impelement the edit profile on submit
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 pt-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} className="w-full" />
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
          name="followPermission"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-start gap-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </FormControl>
                <FormLabel>Anybody can follow you</FormLabel>
              </div>
              <FormDescription>
                This is can handle your follow permission.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-600">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
