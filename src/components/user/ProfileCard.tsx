import ProfileInfoButton from "@/components/button/ProfileInfoButton";
import Avatar from "@/components/user/Avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import FollowButton from "../button/FollowButton";

export default function ProfileCard(props: {
  isProfileOwner: boolean;
  enableFollowBtn?: boolean;
  userId: string;
  username: string;
  followers: bigint;
  following: bigint;
  posts: bigint;
}) {
  const {
    isProfileOwner,
    enableFollowBtn,
    userId,
    username,
    followers,
    posts,
    following,
  } = props;

  return (
    <div className="relative flex w-full items-center gap-x-6 rounded-t-lg border-gray-600 p-6 max-lg:border-b-[1px] lg:border-[1px]">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Avatar avatarContainerStyles="w-[80px] lg:w-[130px] h-auto rounded-full border-[4px] border-gray-200" />
        <span className="text-sm lg:text-xl">{username}</span>
      </div>
      <div
        className={cn(
          "flex w-full flex-col gap-y-4 p-6 lg:px-12",
          enableFollowBtn ? "pt-4" : "",
        )}
      >
        <div className="flex w-full items-center justify-between px-4 max-lg:gap-x-6 max-lg:pt-4 lg:gap-x-12 lg:px-6">
          <Link
            href={`/profile/${username}/followers`}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-sm md:text-lg lg:text-xl">Followers</h1>
            <p className="text-sm md:text-lg lg:text-xl">{followers}</p>
          </Link>
          <Link
            href={`/profile/${username}/following`}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-sm md:text-lg lg:text-xl">Following</h1>
            <p className="text-sm md:text-lg lg:text-xl">{following}</p>
          </Link>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-sm md:text-lg lg:text-xl">Posts</h1>
            <p className="text-sm md:text-lg lg:text-xl">{posts}</p>
          </div>
        </div>

        <FollowButton
          className={cn(
            "transition-colors duration-300",
            enableFollowBtn ? "block" : "hidden",
          )}
          userId={userId}
        />
      </div>

      {isProfileOwner && (
        <ProfileInfoButton
          username={username}
          triggerClassName="absolute top-3 right-4 md:top-4 md:right-4"
        />
      )}
    </div>
  );
}
