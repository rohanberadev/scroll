import FollowButton from "@/components/button/FollowButton";
import Avatar from "@/components/user/Avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function UserCard(props: {
  user: {
    isFollowedByUser: boolean;
    image: {
      publicUrl: string | null;
    } | null;
    id: string;
    name: string;
    followers: bigint;
    isProfileOwner: boolean;
  };
}) {
  const { user } = props;

  return (
    <div
      className={cn(
        "flex h-[100px] w-full items-center justify-between border-b-[1px] border-gray-600 px-8",
        user.isProfileOwner ? "bg-stone-900" : "",
      )}
    >
      <div className="flex items-center gap-x-8">
        <Avatar />
        <Link
          href={`/profile/${user.name}`}
          className="transition-all duration-300 hover:underline"
        >
          {user.name}
        </Link>
      </div>
      <div>
        {user.isFollowedByUser || user.isProfileOwner ? null : (
          <FollowButton userId={user.id} />
        )}
      </div>
    </div>
  );
}
