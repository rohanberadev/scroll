"use client";

import { EllipsisVertical } from "lucide-react";

import Avatar from "@/components/user/Avatar";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function CommentCard(props: {
  comment: string;
  commentedBy: string;
  commentedById: string;
  commentId: string;
  isLikedByUser: boolean;
  initialLikeCount: bigint;
}) {
  const toggleLike = api.comment.toggleLike.useMutation({
    onMutate: () => {
      setLikeCount(likeState ? likeCount - 1n : likeCount + 1n);
      setLikeState(!likeState);
    },
  });
  const [likeState, setLikeState] = useState(props.isLikedByUser);
  const [likeCount, setLikeCount] = useState(props.initialLikeCount);

  return (
    <div className="flex max-h-[80px] min-h-[80px] w-full items-center justify-between rounded-lg border-[1px] border-gray-600 px-6">
      <div className="flex items-center gap-x-4">
        <Avatar />
        <div className="flex flex-col">
          <Link
            href={`/profile/${props.commentedBy}`}
            className="text-sm transition-all duration-300 hover:underline"
          >
            {props.commentedBy}
          </Link>
          <p>{props.comment}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-6">
        <button
          onClick={async () => {
            await toggleLike.mutateAsync({ commentId: props.commentId });
          }}
          className="flex flex-col gap-y-1"
          disabled={toggleLike.isPending}
        >
          {likeState ? (
            <GoHeartFill className="text-xl text-red-600" />
          ) : (
            <GoHeart className="text-xl" />
          )}

          <span className="text-xs">{likeCount}</span>
        </button>
        <button>
          <EllipsisVertical size={24} />
        </button>
      </div>
    </div>
  );
}
