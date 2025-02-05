import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarLib,
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
    <AvatarLib className={cn(avatarContainerStyles)}>
      <AvatarImage
        src="https://github.com/shadcn.png"
        className={cn(
          "block select-none",
          active ? "border-[2px]" : "",
          avatarImageStyles,
        )}
      />
      <AvatarFallback className={avatarFallbackStyles}>CN</AvatarFallback>
      {AvatarLabel}
    </AvatarLib>
  );
}
