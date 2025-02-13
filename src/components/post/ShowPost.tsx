"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import Link from "next/link";

import CommentButton from "@/components/button/CommentButton";
import LikeButton from "@/components/button/LikeButton";
import Avatar from "@/components/user/Avatar";
import { env } from "@/env";
import Image from "next/image";
import { useEffect, useState } from "react";
import PostInfoButton from "../button/PostInfoButton";
import SaveButton from "../button/SaveButton";
import ShareButton from "../button/ShareButton";

// const imageSrc1 =
//   "https://plus.unsplash.com/premium_photo-1675127367513-7f4388aa9076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbHxlbnwwfDF8MHx8fDA%3D";

// const imageSrc2 =
//   "https://plus.unsplash.com/premium_photo-1675433344518-21eb72dfc7a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const imageSrc3 =
//   "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=600";

// const imageSrc4 =
//   "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";

const urlEndpoint = env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT;
const imageSrc5 = `${env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT}/wallpaper_girl.jpg`;

const imageArray = [imageSrc5];

function PostMedia() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const Dots = ({ count, current }: { count: number; current: number }) => {
    const iterator = Array.from({ length: count });

    return (
      <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-x-2 rounded-lg bg-black px-4 py-1 opacity-70">
        {iterator.map((_, index) => (
          <div
            className={cn(
              "h-2 w-2 rounded-full bg-gray-600 transition-colors duration-300",
              index === current ? "bg-white" : "",
            )}
            key={index}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <Carousel className="relative" setApi={setApi}>
      <CarouselContent className="-ml-0">
        {imageArray.map((imageUrl, index) => (
          <CarouselItem
            key={index}
            className="relative select-none pl-[1px] pr-[1px]"
          >
            <AspectRatio ratio={5 / 6}>
              {/* <Image
                src={imageUrl}
                fill
                alt="image1"
                className="object-cover"
              /> */}

              <Image
                src={imageUrl}
                placeholder="blur"
                fill
                loading="lazy"
                alt="Alt text"
                className="object-cover"
                blurDataURL={`${imageUrl}?tr=w-10,h-10,bl-10`}
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>

      {imageArray.length > 1 ? (
        <Dots count={imageArray.length} current={current} />
      ) : null}
    </Carousel>
  );
}

export default function ShowPost() {
  return (
    <Card className="flex w-[400px] flex-col rounded-sm border-gray-600 bg-black text-stone-400 max-xs:rounded-none max-xs:border-l-0 max-xs:border-r-0 max-xs:border-t-0 md:w-[425px] lg:w-[450px] lg:border-[1px]">
      <CardHeader className="flex w-full flex-row items-center justify-between border-b-[1px] border-gray-400 p-4">
        <Link href={"#"} className="flex items-center gap-x-4">
          <Avatar />
          <CardTitle>Username</CardTitle>
        </Link>
        <PostInfoButton />
      </CardHeader>
      <CardContent className="w-full p-0">
        <PostMedia />
      </CardContent>
      <CardFooter className="flex flex-1 flex-col gap-y-6 border-t-[1px] border-gray-400 pt-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-x-6">
            <LikeButton
              active={true}
              className="h-[1.4rem] w-[1.4rem] text-red-600"
              likeCount={200}
            />
            <CommentButton className="h-5 w-5" commentCount={480} />
            <ShareButton className="h-5 w-5" shareCount={20} />
          </div>
          <SaveButton />
        </div>

        <div className="flex w-full justify-start">
          <p className="text-sm">
            Liked by <span className="font-bold">username</span> and{" "}
            <span className="font-bold">200 others</span>
          </p>
        </div>

        <div className="flex w-full flex-col justify-start text-sm">
          <p>This is the post description...</p>
          <span>Viewed by 20k</span>
        </div>
      </CardFooter>
    </Card>
  );
}
