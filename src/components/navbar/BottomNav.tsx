import Link from "next/link";
import NavLink from "./NavLink";

import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import Avatar from "@/components/user/Avatar";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 h-12 w-full border-t-[1px] border-gray-600 bg-black py-2 shadow-lg lg:hidden">
      <ul className="flex w-full items-center justify-around">
        <li>
          <NavLink
            linkHref="#"
            linkLabel="Home"
            FillIcon={GoHomeFill}
            OutlineIcon={GoHome}
          />
        </li>

        <li>
          <NavLink
            linkHref="#"
            linkLabel="Search"
            FillIcon={RiSearchFill}
            OutlineIcon={RiSearchLine}
          />
        </li>

        <li>
          <NavLink
            linkHref="#"
            linkLabel="Create"
            FillIcon={MdAddToPhotos}
            OutlineIcon={MdOutlineAddToPhotos}
          />
        </li>

        <li>
          <NavLink
            linkHref="#"
            linkLabel="Explore"
            FillIcon={MdExplore}
            OutlineIcon={MdOutlineExplore}
          />
        </li>

        <li>
          <Link href={"#"}>
            <Avatar
              avatarContainerStyles="h-auto w-full items-center gap-x-6"
              avatarImageStyles="h-6 w-6 rounded-full object-cover"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
