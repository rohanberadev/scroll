"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ClipLoader } from "react-spinners";

export default function FollowButton(props: {
  className?: string;
  userId: string;
}) {
  const { className, userId } = props;
  const follow = api.user.follow.useMutation();

  return (
    <Button
      className={cn("bg-blue-600", className, follow.isSuccess ? "hidden" : "")}
      onClick={async () => {
        try {
          await follow.mutateAsync({ userId });
        } catch (error) {
          console.error("Follow request failed:", error);
        }
      }}
      disabled={follow.isPending || follow.isSuccess}
    >
      {follow.isPending ? (
        <ClipLoader size={15} />
      ) : follow.isSuccess ? (
        "Following"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
