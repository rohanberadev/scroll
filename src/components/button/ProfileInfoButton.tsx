import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOutIcon, SettingsIcon, UserRoundPenIcon } from "lucide-react";

export default function ProfileInfoButton(props: {
  triggerClassName?: string;
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
          <UserRoundPenIcon />
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm text-red-600">
          <LogOutIcon />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
