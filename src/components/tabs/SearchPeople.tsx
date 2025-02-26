"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import UserCard from "../user/UserCard";

export default function SearchPeople() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data: users,
    isLoading,
    isError,
    isSuccess,
  } = api.user.searchPeopleByUsername.useQuery(
    { query: debouncedSearch },
    { enabled: debouncedSearch.length > 0 },
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <>
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <Input
          placeholder="Search New People..."
          className="rounded-sm border-gray-600 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex h-full w-full flex-col items-center rounded-none border-[1px] border-gray-800 max-lg:rounded-b-md lg:min-h-[calc(100vh-150px)]">
        {isLoading ? (
          <ClipLoader size={32} color="white" className="mt-8" />
        ) : isSuccess ? (
          users.map((user, index) =>
            user ? <UserCard key={index} user={user} /> : null,
          )
        ) : null}
      </div>
    </>
  );
}
