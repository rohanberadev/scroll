"use client";

import { api } from "@/trpc/react";
import { ClipLoader } from "react-spinners";
import UserCard from "./UserCard";

export default function TopPeople() {
  const {
    data: users,
    isPending,
    isError,
    isSuccess,
    error,
  } = api.user.getTopInfinitePeople.useQuery();

  if (isPending) {
    return <ClipLoader size={32} color="white" className="mt-8" />;
  }

  if (isError) {
    console.error(error);
    return;
  }

  if (isSuccess) {
    return users.map((user, index) =>
      user ? <UserCard key={index} user={user} /> : null,
    );
  }
}
