import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { IconType } from "react-icons/lib";

type Props = {
  linkHref: string;
  linkLabel: string;
  FillIcon: IconType;
  OutlineIcon: IconType;
};

export default function NavLink({
  linkHref,
  linkLabel,
  FillIcon,
  OutlineIcon,
}: Props) {
  return (
    <Link href={linkHref} className="">
      <div className="flex items-center gap-x-8">
        <OutlineIcon className="text-2xl leading-none" />
        <span className="text-[1rem] leading-none">{linkLabel}</span>
      </div>
    </Link>
  );
}
