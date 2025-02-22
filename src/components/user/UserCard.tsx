import FollowButton from "@/components/button/FollowButton";
import Avatar from "@/components/user/Avatar";
import Link from "next/link";

export default function UserCard() {
  return (
    <div className="flex h-[100px] w-full items-center justify-between border-b-[1px] border-gray-600 px-8">
      <div className="flex items-center gap-x-8">
        <Avatar />
        <Link
          href={"/profile/id"}
          className="transition-all duration-300 hover:underline"
        >
          Username
        </Link>
      </div>
      <div>
        <FollowButton />
      </div>
    </div>
  );
}
