import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

export default function CommentInfoButton(props: {
  commentedBy: string;
  isCommentedByUser: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" className="bg-black text-gray-100">
        <DropdownMenuLabel>
          Comented by {props.isCommentedByUser ? "You" : props.commentedBy}{" "}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${props.commentedBy}`} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {props.isCommentedByUser ? (
            <button className="w-full bg-transparent text-red-600">
              Delete this comment
            </button>
          ) : (
            <button className="w-full bg-transparent text-red-600">
              Delete this comment
            </button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
