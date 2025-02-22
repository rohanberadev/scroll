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

import CommentButton from "@/components/button/CommentButton";
import FollowButton from "@/components/button/FollowButton";
import LikeButton from "@/components/button/LikeButton";
import PostInfoButton from "@/components/button/PostInfoButton";
import SaveButton from "@/components/button/SaveButton";
import ShareButton from "@/components/button/ShareButton";
import Avatar from "@/components/user/Avatar";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { getPublicFile } from "@/server/supabase/storage";
import type { RouterOutputs } from "@/trpc/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function SupabasePublicImage(props: {
  file: {
    path: string;
    id: string;
    createdAt: Date;
    fullPath: string;
    postId: string | null;
    publicUrl: string;
  };
}) {
  const { file } = props;

  return (
    <Image
      src={file.publicUrl}
      fill
      loading="lazy"
      alt="image post"
      className="object-cover"
    />
  );
}

function SupabaseSignedImage(props: {
  file: {
    path: string;
    id: string;
    createdAt: Date;
    fullPath: string;
    postId: string | null;
  };
}) {
  const { file } = props;

  const {
    data: image,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`signed-image${file.id}}`],
    queryFn: () => getPublicFile(file),
    enabled: Boolean(file),
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ClipLoader size={64} color="white" />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isSuccess && image) {
    return (
      <Image
        src={image.publicUrl}
        fill
        loading="lazy"
        alt="image post"
        className="object-cover"
      />
    );
  }
}

function PostMedia(props: {
  files: {
    path: string;
    id: string;
    createdAt: Date;
    fullPath: string;
    postId: string | null;
    publicUrl: string | null;
  }[];
  postType: "PRIVATE" | "PUBLIC" | "DRAFT";
}) {
  const { files } = props;

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
        {files.map((file, index) => (
          <CarouselItem
            key={index}
            className="relative select-none pl-[1px] pr-[1px]"
          >
            <AspectRatio ratio={5 / 6}>
              {file.publicUrl ? (
                <SupabasePublicImage
                  file={{ ...file, publicUrl: file.publicUrl }}
                />
              ) : (
                <SupabaseSignedImage file={file} />
              )}
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>

      {files.length > 1 ? (
        <Dots count={files.length} current={current} />
      ) : null}
    </Carousel>
  );
}

export default function ShowPost(props: {
  post: RouterOutputs["post"]["infiniteLatestPosts"][0];
}) {
  const { post } = props;

  return (
    <Card className="flex w-[400px] flex-col rounded-sm border-gray-600 bg-black text-stone-400 max-xs:rounded-none max-xs:border-l-0 max-xs:border-r-0 max-xs:border-t-0 md:w-[425px] lg:w-[450px] lg:border-[1px]">
      <CardHeader className="flex w-full flex-row items-center justify-between border-b-[1px] border-gray-400 p-4">
        <div className="flex items-center gap-x-4">
          <Link href={`/profile/${post.postedBy.name}`}>
            <Avatar />
          </Link>
          <CardTitle className="flex items-center gap-x-4">
            <Link
              href={`/profile/${post.postedBy.name}`}
              className="transition-all duration-300 hover:underline"
            >
              {post.postedBy.name}
            </Link>
            {post.postedBy.isFollowedByUser || post.isPostOwner ? null : (
              <FollowButton className="h-[22]" />
            )}
          </CardTitle>
        </div>
        <PostInfoButton />
      </CardHeader>
      <CardContent className="w-full p-0">
        {post.files && <PostMedia files={post.files} postType={post.type} />}
      </CardContent>
      <CardFooter className="flex flex-1 flex-col gap-y-6 border-t-[1px] border-gray-400 pt-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-x-6">
            <LikeButton
              activeColor="text-red-600"
              active={post.isLikedByUser}
              className="h-[1.4rem] w-[1.4rem]"
              likeCount={post.likes}
            />
            <CommentButton className="h-5 w-5" commentCount={post.comments} />
            <ShareButton className="h-5 w-5" shareCount={post.shares} />
          </div>
          <SaveButton />
        </div>

        <div className="flex w-full justify-start">
          <p className="text-sm">
            Liked by <span className="font-bold">username</span> and{" "}
            <span className="font-bold">{post.likes} others</span>
          </p>
        </div>

        <div className="flex w-full flex-col justify-start text-sm">
          <p>{post.caption}</p>
          <span>Viewed by {post.views}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
