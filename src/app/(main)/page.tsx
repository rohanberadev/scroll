"use client";

import { auth } from "@/server/auth";
import { api } from "@/trpc/react";

import StorieList from "@/components/storie/StorieList";
import ShowPost from "@/components/post/ShowPost";

export default function Home() {
  const posts = Array.from({ length: 2 }, (_, i) => `${i + 1}`);

  return (
    <div className="flex w-full flex-col items-center">
      <StorieList />

      {/* <hr className="my-2 border-gray-600" /> */}

      <div className="flex flex-col items-center gap-y-12 py-4">
        {posts.map((_, index) => (
          <ShowPost key={index} />
        ))}
      </div>
    </div>
  );
}
