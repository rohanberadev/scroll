import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import NavLink from "@/components/navbar/NavLink";

export default function AppHeader() {
  return (
    <header className="sticky left-0 top-0 z-50 flex h-14 w-full items-center justify-between border-b-[1px] border-gray-400 bg-black px-4 shadow-lg lg:hidden">
      <h1 className="text-3xl">Scroll</h1>
      <ul className="flex items-center gap-x-4">
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
            linkLabel="Messages"
            FillIcon={AiFillMessage}
            OutlineIcon={AiOutlineMessage}
          />
        </li>
      </ul>
    </header>
  );
}
