import {
  Avatar as AvatarLib,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  avatarContainerStyles?: string;
  avatarImageUrl?: string;
  avatarImageStyles?: string;
  avatarFallbackStyles?: string;
  AvatarLabel?: JSX.Element;
  active?: boolean;
};

export default function Avatar({
  avatarContainerStyles,
  avatarImageUrl,
  avatarImageStyles,
  avatarFallbackStyles,
  AvatarLabel,
  active,
}: Props) {
  return (
    <AvatarLib className={avatarContainerStyles}>
      <AvatarImage
        src="https://github.com/shadcn.png"
        className={avatarImageStyles}
      />
      <AvatarFallback className={avatarFallbackStyles}>CN</AvatarFallback>
      {AvatarLabel}
    </AvatarLib>
  );
}

/*

*/
