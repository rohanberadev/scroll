"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GoHeartFill } from "react-icons/go";
import { FaComment } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

type Props = {
  heightMinusOffset: number;
};

function Post({ url }: { url: string }) {
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
        <Image src={url} fill alt="image" />
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
          <span className="text-white max-lg:text-xs">12</span>
        </div>
        <div className="flex flex-col items-center">
          <FaComment className="h-5 w-5 text-white lg:h-6 lg:w-6" />
          <span className="text-white max-lg:text-xs">12</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PostsGrid({ heightMinusOffset }: Props) {
  const imageUrl =
    "https://images.unsplash.com/photo-1517135399940-2855f5be7c4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D";
  const array = Array.from({ length: 15 }, (_, i) => imageUrl);

  return (
    <div className="grid w-full grid-cols-3">
      {array.map((url, index) => (
        <Link href={`/posts/${index}`} key={index}>
          <Post url={url} />
        </Link>
      ))}
    </div>
  );
}
