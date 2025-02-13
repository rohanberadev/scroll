"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

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
        <IKImage
          src={url}
          placeholder="blur"
          fill
          alt="image"
          className="object-cover"
          blurDataURL={`${url}?tr=w-10,h-10,bl-10`}
        />
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PostsGrid({ heightMinusOffset }: Props) {
  const imageUrl = `${env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT}/wallpaper_girl.jpg`;
  const array = Array.from({ length: 15 }, (_, _i) => imageUrl);

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
