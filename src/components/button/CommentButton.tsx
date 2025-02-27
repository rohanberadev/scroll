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

import CommentCard from "../card/CommentCard";

type Props = {
  className?: string;
  commentCount: bigint;
  username: string;
  postId: string;
};

export default function CommentButton({
  className,
  commentCount,
  username,
  postId,
}: Props) {
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
            {Array.from({ length: 100 }).map((_, index) => (
              <CommentCard key={index} />
            ))}
          </div>
        </div>
        <DrawerFooter className="flex flex-row">
          <Input
            className="h-16 w-full border-gray-600 text-4xl"
            placeholder="Enter your comment on this post..."
          />
          <Button className="h-16 w-16 bg-blue-600">
            <SendHorizontal size={48} color="white" />
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
