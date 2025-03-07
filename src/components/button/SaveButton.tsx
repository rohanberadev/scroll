"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function SaveButton(props: {
  isSavedByUser: boolean;
  postId: string;
}) {
  const utils = api.useUtils();
  const [state, setState] = useState(props.isSavedByUser);
  const savePost = api.post.toggleSavePost.useMutation({
    onSuccess: async function () {
      await utils.user.getMyInfiniteSavedPosts.refetch();
    },
  });

  async function onClick() {
    setState(!state);
    const newState = await savePost.mutateAsync({ postId: props.postId });
    setState(newState);
  }

  return (
    <Button
      className="bg-transparent"
      disabled={savePost.isPending}
      onClick={onClick}
    >
      {state ? (
        <BsBookmarkFill className="h-5 w-5 cursor-pointer" />
      ) : (
        <BsBookmark className="h-5 w-5 cursor-pointer" />
      )}
    </Button>
  );
}
