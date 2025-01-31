"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import NavLink from "@/components/navbar/NavLink";
import Avatar from "@/components/user/Avatar";

import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 h-12 w-full border-t-[1px] border-gray-600 bg-black py-2 shadow-lg lg:hidden">
      <ul className="flex w-full items-center justify-around">
        <li>
          <NavLink
            linkHref="/"
            linkLabel="Home"
            FillIcon={GoHomeFill}
            OutlineIcon={GoHome}
            active={pathname === "/"}
          />
        </li>

        <li>
          <NavLink
            linkHref="/search"
            linkLabel="Search"
            FillIcon={RiSearchFill}
            OutlineIcon={RiSearchLine}
            active={pathname === "/search"}
          />
        </li>

        <li>
          <NavLink
            linkHref="/create"
            linkLabel="Create"
            FillIcon={MdAddToPhotos}
            OutlineIcon={MdOutlineAddToPhotos}
            active={pathname === "/create"}
          />
        </li>

        <li>
          <NavLink
            linkHref="/explore"
            linkLabel="Explore"
            FillIcon={MdExplore}
            OutlineIcon={MdOutlineExplore}
            active={pathname === "/explore"}
          />
        </li>

        <li>
          <Link href={"/profile"}>
            <Avatar
              avatarContainerStyles="h-auto w-full items-center gap-x-6"
              avatarImageStyles="h-6 w-6 rounded-full object-cover"
              active={pathname === "/profile"}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
