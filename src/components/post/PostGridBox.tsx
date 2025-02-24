"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import {
  SupabasePublicImage,
  SupabaseSignedImage,
} from "../image/SupabaseImage";

export default function PostGridBox(props: {
  file: {
    path: string;
    id: string;
    publicUrl: string | null;
    createdAt: Date;
    fullPath: string;
    postId: string | null;
  };
  likes: bigint;
  shares: bigint;
}) {
  const { file, likes, shares } = props;

  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="relative select-none"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onClick={() => console.log("clicked")}
    >
      <AspectRatio
        ratio={1 / 1}
        className={cn(
          "m-[1px] cursor-pointer transition-all duration-300 hover:opacity-60",
          hover ? "opacity-60" : "",
        )}
      >
        {file.publicUrl ? (
          <SupabasePublicImage publicUrl={file.publicUrl} />
        ) : (
          <SupabaseSignedImage file={file} />
        )}
      </AspectRatio>
      <motion.div
        className={cn(
          "absolute left-1/2 top-1/2 z-40 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
          hover ? "flex items-center gap-x-8 lg:gap-x-12" : "",
        )}
        onHoverStart={() => setHover(true)}
      >
        <div className="flex flex-col items-center">
          <GoHeartFill className="h-5 w-5 text-white lg:h-6 lg:w-6" />
          <span className="text-white max-lg:text-xs">{likes}</span>
        </div>
        <div className="flex flex-col items-center">
          <FaComment className="h-5 w-5 text-white lg:h-6 lg:w-6" />
          <span className="text-white max-lg:text-xs">{shares}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
