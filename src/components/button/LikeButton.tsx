"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

type Props = {
  className?: string;
  active?: boolean;
  activeColor?: string;
  likes: bigint;
  postId: string;
};

export default function LikeButton({
  className,
  active,
  activeColor,
  likes,
  postId,
}: Props) {
  const like = api.post.toggleLike.useMutation();
  const [likeState, setLikeState] = useState(active ? true : false);
  const [likeCount, setLikeCount] = useState(likes);

  const onClick = async () => {
    try {
      setLikeCount(likeState ? BigInt(likeCount - 1n) : BigInt(likeCount + 1n));
      setLikeState(!likeState);
      await like.mutateAsync({ postId });
    } catch (error) {
      console.error("Error in like button of the post:", error);
    }
  };

  if (likeState) {
    return (
      <div className="flex flex-col items-center">
        <button onClick={onClick} disabled={like.isPending}>
          <GoHeartFill className={cn(className, activeColor)} />
        </button>

        <span className="text-xs">{likeCount}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button onClick={onClick} disabled={like.isPending}>
        <GoHeart className={className} />
      </button>
      <span className="text-xs">{likeCount}</span>
    </div>
  );
}
