import Link from "next/link";
import { type IconType } from "react-icons/lib";

type Props = {
  linkHref: string;
  linkLabel: string;
  FillIcon: IconType;
  OutlineIcon: IconType;
  active?: boolean;
};

export default function NavLink({
  linkHref,
  linkLabel,
  FillIcon,
  OutlineIcon,
  active,
}: Props) {
  return (
    <Link href={linkHref} className="inline-block">
      <div className="flex items-center gap-x-8">
        {active ? (
          <FillIcon className="text-2xl leading-none" />
        ) : (
          <OutlineIcon className="text-2xl leading-none" />
        )}
        <span className="text-[1rem] leading-none max-lg:hidden">
          {linkLabel}
        </span>
      </div>
    </Link>
  );
}
