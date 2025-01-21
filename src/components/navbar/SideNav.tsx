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
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";

export default function SideNav() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className="border-r-[1px] border-gray-600 pl-8 pt-12 max-lg:hidden lg:w-[250px] xl:w-[325px]">
      <Link href={"/"} className="inline-flex">
        <h1 className="text-4xl">Scroll</h1>
      </Link>
      <ul className="mt-12 flex flex-col gap-y-10 text-lg">
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
            linkHref="/explore"
            linkLabel="Explore"
            FillIcon={MdExplore}
            OutlineIcon={MdOutlineExplore}
            active={pathname === "/explore"}
          />
        </li>
        <li>
          <NavLink
            linkHref="/messages"
            linkLabel="Messages"
            FillIcon={AiFillMessage}
            OutlineIcon={AiOutlineMessage}
            active={pathname === "/messages"}
          />
        </li>
        <li>
          <NavLink
            linkHref="/notifications"
            linkLabel="Notifications"
            FillIcon={GoHeartFill}
            OutlineIcon={GoHeart}
            active={pathname === "/notifications"}
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
          <Link href={"/profile"}>
            <Avatar
              avatarContainerStyles="h-auto w-full items-center gap-x-6"
              avatarImageStyles="h-6 w-6 rounded-full object-cover"
              AvatarLabel={<span className="text-[1rem]">Profile</span>}
              active={pathname === "/profile"}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
