import { GoHeart, GoHeartFill } from "react-icons/go";

type Props = {
  className?: string;
  active?: boolean;
};

export default function LikeButton({ className, active }: Props) {
  if (active) {
    return <GoHeartFill className={className} />;
  }

  return <GoHeart className={className} />;
}
