import { GoHeart, GoHeartFill } from "react-icons/go";

type Props = {
  className?: string;
  active?: boolean;
  likeCount?: number;
};

export default function LikeButton({ className, active, likeCount }: Props) {
  if (active) {
    return (
      <div className="flex flex-col items-center">
        <GoHeartFill className={className} />
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
