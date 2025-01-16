import Link from "next/link";
import NavLink from "./NavLink";

import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { BiMessageSquare } from "react-icons/bi";
import { BiSolidMessageSquare } from "react-icons/bi";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="border-r-[1px] border-gray-400 pl-8 pt-12 lg:w-[250px] xl:w-[325px]">
      <h1 className="text-4xl">Scroll</h1>
      <ul className="mt-12 flex flex-col gap-y-10 text-lg">
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
            linkLabel="Explore"
            FillIcon={MdExplore}
            OutlineIcon={MdOutlineExplore}
          />
        </li>
        <li>
          <NavLink
            linkHref="#"
            linkLabel="Messages"
            FillIcon={BiSolidMessageSquare}
            OutlineIcon={BiMessageSquare}
          />
        </li>
        <li>
          <NavLink
            linkHref="#"
            linkLabel="Notifications"
            FillIcon={GoHeartFill}
            OutlineIcon={GoHeart}
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
          <Link href={"#"}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
