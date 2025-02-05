import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EllipsisVerticalIcon,
  LogOutIcon,
  UserRoundPenIcon,
} from "lucide-react";

export default function ProfileInfoButton(props: {
  triggerClassName?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={props.triggerClassName}>
        <EllipsisVerticalIcon />
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
