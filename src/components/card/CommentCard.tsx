import { EllipsisVertical, Heart } from "lucide-react";

import Avatar from "@/components/user/Avatar";
import Link from "next/link";

export default function CommentCard(props: {
  comment: string;
  commentedBy: string;
  commentedById: string;
}) {
  return (
    <div className="flex max-h-[80px] min-h-[80px] w-full items-center justify-between rounded-lg border-[1px] border-gray-600 px-6">
      <div className="flex items-center gap-x-4">
        <Avatar />
        <div className="flex flex-col">
          <Link
            href={`/profile/${props.commentedById}`}
            className="text-sm transition-all duration-300 hover:underline"
          >
            {props.commentedBy}
          </Link>
          <p>{props.comment}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-6">
        <button>
          <Heart size={24} />
        </button>
        <button>
          <EllipsisVertical size={24} />
        </button>
      </div>
    </div>
  );
}
