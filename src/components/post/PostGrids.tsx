"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import PostGridBox from "./PostGridBox";

export function TopPublicPosts() {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = api.post.getInfiniteTopPosts.useQuery();

  if (isLoading) {
    return <ClipLoader size={32} color="white" className="mt-8" />;
  }

  if (error) {
    console.error(error);
    return <p className="text-2xl text-red-600">{JSON.stringify(error)}</p>;
  }

  if (isSuccess) {
    return (
      <div className="grid w-full grid-cols-3">
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={index}>
            {post.files[0] && (
              <PostGridBox
                likes={post.likes}
                comments={post.comments}
                file={post.files[0]}
              />
            )}
          </Link>
        ))}
      </div>
    );
  }
}

export function UserPublicPostsGrid(props: { userId: string }) {
  const { userId } = props;

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
    return (
      <div className="grid w-full grid-cols-3">
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={index}>
            {post.files[0] && (
              <PostGridBox
                likes={post.likes}
                comments={post.comments}
                file={post.files[0]}
              />
            )}
          </Link>
        ))}
      </div>
    );
  }
}

export function MyUserAllTypePostsGrid() {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = api.user.getMyAllTypeInfinitePosts.useQuery();

  if (isLoading) {
    return <ClipLoader size={32} color="white" className="mt-8" />;
  }

  if (error) {
    console.error(error);
    return <p className="text-2xl text-red-600">{JSON.stringify(error)}</p>;
  }

  if (isSuccess) {
    return (
      <div className="grid w-full grid-cols-3">
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={index}>
            {post.files[0] && (
              <PostGridBox
                likes={post.likes}
                comments={post.comments}
                file={post.files[0]}
              />
            )}
          </Link>
        ))}
      </div>
    );
  }
}

export function MyUserFollowerTypePostsGrid() {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = api.user.getMyFollowerTypeInfinitePosts.useQuery();

  if (isLoading) {
    return <ClipLoader size={32} color="white" className="mt-8" />;
  }

  if (error) {
    console.error(error);
    return <p className="text-2xl text-red-600">{JSON.stringify(error)}</p>;
  }

  if (isSuccess) {
    return (
      <div className="grid w-full grid-cols-3">
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={index}>
            {post.files[0] && (
              <PostGridBox
                likes={post.likes}
                comments={post.comments}
                file={post.files[0]}
              />
            )}
          </Link>
        ))}
      </div>
    );
  }
}

export function MyUserMeTypePostsGrid() {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = api.user.getMyMeTypeInfinitePosts.useQuery();

  if (isLoading) {
    return <ClipLoader size={32} color="white" className="mt-8" />;
  }

  if (error) {
    console.error(error);
    return <p className="text-2xl text-red-600">{JSON.stringify(error)}</p>;
  }

  if (isSuccess) {
    return (
      <div className="grid w-full grid-cols-3">
        {posts.map((post, index) => (
          <Link href={`/posts/${post.id}`} key={index}>
            {post.files[0] && (
              <PostGridBox
                likes={post.likes}
                comments={post.comments}
                file={post.files[0]}
              />
            )}
          </Link>
        ))}
      </div>
    );
  }
}
