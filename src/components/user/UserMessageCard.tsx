import Link from "next/link";
import Avatar from "./Avatar";

export default function UserMessageCard() {
  const active = true;
  const lastMessage = "Rohan: Lastmessage";

  return (
    <div className="mb-6 flex h-[100px] w-full items-center rounded-md border-[1px] border-gray-400 p-2">
      <div className="flex items-center gap-x-4">
        <Link href={"#"} className="relative">
          <Avatar avatarContainerStyles="w-14 h-14" />
          {active && (
            <span className="absolute bottom-[0.1rem] right-[0.1rem] z-40 h-3 w-3 rounded-full bg-emerald-600"></span>
          )}
        </Link>
        <div className="flex flex-col gap-y-1">
          <Link href={"#"}>Username</Link>
          {lastMessage && (
            <span className="text-sm text-gray-400">{lastMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}
