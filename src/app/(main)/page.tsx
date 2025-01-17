"use client";

import { auth } from "@/server/auth";
import { api } from "@/trpc/react";

import StorieList from "@/components/storie/StorieList";
import ShowPost from "@/components/post/ShowPost";

export default function Home() {
  const ids = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
  const queries = ids.map((id) => api.test.getById.useQuery({ id }));

  return (
    <div>
      <StorieList />

      {/* <hr className="my-2 border-gray-600" /> */}

      <div className="flex flex-col items-center gap-y-12 py-4">
        <ShowPost />
        <ShowPost />
      </div>
    </div>
  );
}
