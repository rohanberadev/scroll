import Avatar from "@/components/user/Avatar";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function MessageHeader() {
  return (
    <header className="flex h-14 w-full items-center gap-x-6 border-b-[1px] border-gray-600 bg-black px-4 shadow-lg max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-50 lg:sticky lg:left-0 lg:top-0 lg:h-20 lg:rounded-t-md">
      <Link href={"/messages"}>
        <ArrowLeftIcon />
      </Link>
      <div className="flex items-center gap-x-4">
        <Avatar avatarContainerStyles="w-8 h-8" />
        <h1>Username</h1>
      </div>
    </header>
  );
}
