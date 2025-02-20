import { cn } from "@/lib/utils";
import { GoHeart, GoHeartFill } from "react-icons/go";

type Props = {
  className?: string;
  active?: boolean;
  activeColor?: string;
  likeCount: bigint;
};

export default function LikeButton({
  className,
  active,
  activeColor,
  likeCount,
}: Props) {
  if (active) {
    return (
      <div className="flex flex-col items-center">
        <GoHeartFill className={cn(className, activeColor)} />
        <span className="text-xs">{likeCount}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <GoHeart className={className} />
      <span className="text-xs">{likeCount}</span>
    </div>
  );
}
