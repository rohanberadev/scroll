"use client";

import { api } from "@/trpc/react";
import { ClipLoader } from "react-spinners";
import ShowPost from "./ShowPost";

export default function InfintePosts() {
  const {
    data: posts,
    isSuccess,
    isLoading,
    isError,
    error,
  } = api.post.infiniteLatestPosts.useQuery();

  if (isLoading) {
    return <ClipLoader size={32} color="white" className="mt-8" />;
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center lg:gap-y-12 lg:py-4">
        {posts.map((post, index) => (
          <ShowPost key={index} post={post} />
        ))}
      </div>
    );
  }
}
