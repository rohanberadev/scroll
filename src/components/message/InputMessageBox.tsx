"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { SendHorizontalIcon } from "lucide-react";

export default function InputMessageBox() {
  const hey = api.test.hey.useMutation();

  return (
    <div className="flex h-20 w-full items-center gap-x-6 rounded-md bg-black p-2 shadow-lg max-lg:fixed max-lg:bottom-14 max-lg:left-0 max-lg:z-50 max-lg:h-16 max-lg:w-[98%] max-lg:gap-x-4 lg:sticky lg:bottom-0 lg:left-0 lg:rounded-none lg:border-b-0 lg:border-l-0 lg:border-r-0">
      <Textarea
        placeholder="Message..."
        className="h-full min-h-0 w-full rounded-xl border-[1px] border-gray-600 lg:text-xl"
      />
      <Button
        className="h-full w-24 rounded-xl bg-blue-800 p-0 max-lg:w-20"
        onClick={async () => await hey.mutateAsync()}
      >
        <SendHorizontalIcon size={128} />
      </Button>
    </div>
  );
}
