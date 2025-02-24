"use client";

import { env } from "@/env";
import { api } from "@/trpc/react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import PostGridBox from "./PostGridBox";

export default function PostsGrid(props: { userId: string }) {
  const { userId } = props;
  console.log(userId);

  const imageUrl = `${env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_URL_ENDPOINT}/wallpaper_girl.jpg`;
  const array = Array.from({ length: 15 }, (_, _i) => imageUrl);

  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = api.post.getInfinitePostsOfUser.useQuery(
    {
      userId,
    },
    { enabled: Boolean(userId) },
  );

  if (isLoading) {
    return <ClipLoader size={32} color="white" className="mt-8" />;
  }

  if (error) {
    console.error(error);
    return <p className="text-2xl text-red-600">{JSON.stringify(error)}</p>;
  }

  if (isSuccess) {
    console.log(posts);
    return (
      <div className="grid w-full grid-cols-3">
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={index}>
            {post.files[0] && (
              <PostGridBox
                likes={post.likes}
                shares={post.shares}
                file={post.files[0]}
              />
            )}
          </Link>
        ))}
      </div>
    );
  }
}
