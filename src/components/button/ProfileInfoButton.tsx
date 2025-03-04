import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/server/auth";
import { LogOutIcon, SettingsIcon, UserRoundPenIcon } from "lucide-react";
import Link from "next/link";
import { BsBookmark } from "react-icons/bs";

export default function ProfileInfoButton(props: {
  triggerClassName?: string;
  username: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={props.triggerClassName}>
        <SettingsIcon className="text-gray-200 max-lg:h-5 max-lg:w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-gray-200">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sm">
          <Link
            href={`/profile/${props.username}/edit`}
            className="flex items-center gap-x-2"
          >
            <UserRoundPenIcon className="text-xs" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm">
          <Link
            href={`/profile/${props.username}/saved-posts`}
            className="flex items-center gap-x-2"
          >
            <BsBookmark />
            <span>Saved Posts</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sm text-red-600">
          <LogOutIcon />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
