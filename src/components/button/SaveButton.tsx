"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function SaveButton(props: {
  isSavedByUser: boolean;
  postId: string;
}) {
  const [state, setState] = useState(props.isSavedByUser);
  const savePost = api.post.toggleSavePost.useMutation();

  async function onClick() {
    setState(!state);
    const newState = await savePost.mutateAsync({ postId: props.postId });
    setState(newState);
  }

  if (state) {
    return (
      <Button
        className="bg-transparent"
        disabled={savePost.isPending}
        onClick={onClick}
      >
        <BsBookmarkFill className="h-5 w-5 cursor-pointer" />
      </Button>
    );
  }

  return (
    <Button
      className="bg-transparent"
      disabled={savePost.isPending}
      onClick={onClick}
    >
      <BsBookmark className="h-5 w-5 cursor-pointer" />
    </Button>
  );
}
