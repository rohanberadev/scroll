"use client";

import { api } from "@/trpc/react";
import { ClipLoader } from "react-spinners";
import UserCard from "./UserCard";

export function FollowerUserCardGroup(props: { username: string }) {
  const {
    data: users,
    isSuccess,
    isLoading,
  } = api.user.getInfiniteFollowersOfUser.useQuery({
    username: props.username,
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <ClipLoader size={48} color="white" className="mt-8" />
      </div>
    );
  }

  if (isSuccess) {
    if (users.length === 0) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gray-950 p-4">
          <p className="text-2xl text-gray-600">Nothing to see here.</p>
        </div>
      );
    }

    return (
      <div className="flex h-full w-full flex-col">
        {users.map((user, index) =>
          user ? <UserCard key={index} user={user} /> : null,
        )}
      </div>
    );
  }
}

export function FollowingUserCardGroup(props: { username: string }) {
  const {
    data: users,
    isSuccess,
    isLoading,
  } = api.user.getInfiniteFollowingOfUser.useQuery({
    username: props.username,
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <ClipLoader size={48} color="white" className="mt-8" />
      </div>
    );
  }

  if (isSuccess) {
    if (users.length === 0) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gray-950 p-4">
          <p className="text-2xl text-gray-600">Nothing to see here.</p>
        </div>
      );
    }

    return users.map((user, index) => {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { Following, ...newUser } = user;
        return <UserCard key={index} user={newUser} />;
      }
    });
  }
}
