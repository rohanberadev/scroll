"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import { SendHorizontal, X } from "lucide-react";
import { FaRegComment } from "react-icons/fa";

import { api } from "@/trpc/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import CommentCard from "../card/CommentCard";

type Props = {
  className?: string;
  initialCommentCount: bigint;
  username: string;
  postId: string;
};

export default function CommentButton({
  className,
  initialCommentCount,
  username,
  postId,
}: Props) {
  const { data: commentCount, refetch: refetchCommentCount } =
    api.post.getCommentCount.useQuery(
      { postId },
      {
        initialData: initialCommentCount,
        placeholderData: initialCommentCount,
        enabled: Boolean(postId),
        staleTime: 5000,
      },
    );

  const {
    data: comments,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch: refetchComments,
  } = api.comment.getAllInfiniteCommentsByPostId.useQuery(
    { postId },
    { enabled: Boolean(postId) },
  );

  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      setCommentInput("");
      await refetchComments();
      await refetchCommentCount();
    },
  });

  const [commentInput, setCommentInput] = useState("");

  return (
    <Drawer>
      <DrawerTrigger className="flex flex-col items-center gap-[0.15rem]">
        <FaRegComment className={className} />
        <span className="text-xs">{commentCount}</span>
      </DrawerTrigger>
      <DrawerContent className="h-[650px] w-full rounded-none border-l-[0px] border-r-[0px] border-gray-800 bg-black text-gray-400 max-lg:h-full">
        <DrawerHeader>
          <DrawerTitle>Comment Section of this post</DrawerTitle>
          <DrawerDescription>
            You are currently in a comment section of {username}
            {"'s"} post.
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full overflow-y-auto p-8">
          <div className="flex h-full w-full flex-col gap-y-8">
            {isLoading ? (
              <ClipLoader size={32} color="white" className="mt-8" />
            ) : isSuccess ? (
              comments.map((comment, index) =>
                comment ? (
                  <CommentCard
                    key={index}
                    comment={comment.content}
                    commentedBy={comment.commentedBy.name}
                    commentedById={comment.commetedById}
                    commentId={comment.id}
                    isLikedByUser={comment.isLikedByUser}
                    initialLikeCount={comment.likes}
                    isCommentedByUser={comment.isCommentedByUser}
                  />
                ) : null,
              )
            ) : (
              <p className="text-2xl text-white">Nothing to see</p>
            )}
          </div>
        </div>
        <DrawerFooter className="flex flex-row">
          <Input
            className="h-16 w-full border-gray-600 text-4xl"
            placeholder="Enter your comment on this post..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button
            className="flex h-16 w-16 items-center justify-center bg-blue-600"
            onClick={async () => {
              await createComment.mutateAsync({
                postId,
                content: commentInput.valueOf(),
              });
            }}
            disabled={createComment.isPending}
          >
            {createComment.isPending ? (
              <ClipLoader size={24} color="white" className="mt-8" />
            ) : (
              <SendHorizontal size={48} color="white" />
            )}
          </Button>
          <DrawerClose asChild className="absolute right-4 top-4">
            <button>
              <X className="text-red-600" size={32} />
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
