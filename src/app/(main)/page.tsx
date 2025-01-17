"use client";

import { auth } from "@/server/auth";
import { api } from "@/trpc/react";

export default function Home() {
  const ids = Array.from({ length: 10 }, (_, i) => `${i + 1}`);
  const queries = ids.map((id) => api.test.getById.useQuery({ id }));

  return (
    <main>
      <div className="text-4xl text-white">Home</div>
      {queries.map((query, index) => (
        <p key={index}>{query.data?.title}</p>
      ))}

      {queries.map((query, index) => (
        <p key={index}>{query.data?.title}</p>
      ))}

      {queries.map((query, index) => (
        <p key={index}>{query.data?.title}</p>
      ))}

      {queries.map((query, index) => (
        <p key={index}>{query.data?.title}</p>
      ))}

      {queries.map((query, index) => (
        <p key={index}>{query.data?.title}</p>
      ))}

      {queries.map((query, index) => (
        <p key={index}>{query.data?.title}</p>
      ))}
    </main>
  );
}
