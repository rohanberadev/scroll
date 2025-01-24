"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GoHeartFill } from "react-icons/go";
import { FaComment } from "react-icons/fa";

type Props = {
  heightMinusOffset: number;
};

function Post({ url }: { url: string }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
      <div
        className={cn(
          "absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
          hover ? "flex items-center gap-x-8 lg:gap-x-12" : "",
        )}
        onMouseEnter={() => setHover(true)}
      >
        <div className="flex flex-col items-center">
          <GoHeartFill className="h-6 w-4 text-white lg:h-6 lg:w-6" />
          <span className="text-white max-lg:text-xs">12</span>
        </div>
        <div className="flex flex-col items-center">
          <FaComment className="h-6 w-4 text-white lg:h-6 lg:w-6" />
          <span className="text-white max-lg:text-xs">12</span>
        </div>
      </div>
    </div>
  );
}

export default function PostsGrid({ heightMinusOffset }: Props) {
  const imageUrl =
    "https://images.unsplash.com/photo-1517135399940-2855f5be7c4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D";
  const array = Array.from({ length: 15 }, (_, i) => imageUrl);

  return (
    <div className="grid w-full grid-cols-3">
      {array.map((url, index) => (
        <Post key={index} url={url} />
      ))}
    </div>
  );
}
