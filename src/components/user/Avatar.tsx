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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  avatarImageUrl,
  avatarImageStyles,
  avatarFallbackStyles,
  AvatarLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  active,
}: Props) {
  return (
    <AvatarLib className={avatarContainerStyles}>
      <AvatarImage
        src="https://github.com/shadcn.png"
        className={cn("select-none", avatarImageStyles)}
      />
      <AvatarFallback className={avatarFallbackStyles}>CN</AvatarFallback>
      {AvatarLabel}
    </AvatarLib>
  );
}
