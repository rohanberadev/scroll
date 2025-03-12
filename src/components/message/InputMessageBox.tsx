"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon } from "lucide-react";
import { type ChangeEventHandler } from "react";

export default function InputMessageBox(props: {
  onSubmit: (content: string) => Promise<void>;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  buttonDisabled: boolean;
}) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await props.onSubmit(props.value);
      }}
      className="flex h-20 w-full items-center gap-x-6 rounded-md bg-black p-2 shadow-lg max-lg:fixed max-lg:bottom-14 max-lg:left-0 max-lg:z-50 max-lg:h-16 max-lg:w-[98%] max-lg:gap-x-4 lg:sticky lg:bottom-0 lg:left-0 lg:rounded-none lg:border-b-0 lg:border-l-0 lg:border-r-0"
    >
      <Textarea
        placeholder="Type a message..."
        className="h-full min-h-0 w-full resize-none rounded-xl border-[1px] border-gray-600 lg:text-xl"
        onChange={props.onChange}
        value={props.value}
      />
      <Button
        className="h-full w-24 rounded-xl bg-blue-800 p-0 max-lg:w-20"
        type="submit"
        disabled={props.buttonDisabled}
      >
        <SendHorizontalIcon size={128} />
      </Button>
    </form>
  );
}
