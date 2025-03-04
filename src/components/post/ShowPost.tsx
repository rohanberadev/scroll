import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CommentButton from "@/components/button/CommentButton";
import FollowButton from "@/components/button/FollowButton";
import LikeButton from "@/components/button/LikeButton";
import PostInfoButton from "@/components/button/PostInfoButton";
import SaveButton from "@/components/button/SaveButton";
import ShareButton from "@/components/button/ShareButton";
import PostMedia from "@/components/post/PostMedia";
import Avatar from "@/components/user/Avatar";

import type { RouterOutputs } from "@/trpc/react";
import Link from "next/link";

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
              <FollowButton className="h-[22]" userId={post.postedById} />
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
              likes={post.likes}
              postId={post.id}
            />
            <CommentButton
              className="h-5 w-5"
              initialCommentCount={post.comments}
              username={post.postedBy.name}
              postId={post.id}
            />
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
