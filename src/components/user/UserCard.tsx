import { Button } from "@/components/ui/button";
import Avatar from "@/components/user/Avatar";

export default function UserCard() {
  return (
    <div className="flex h-[100px] w-full items-center justify-between border-b-[1px] border-gray-600 px-8">
      <div className="flex items-center gap-x-8">
        <Avatar />
        <span>Username</span>
      </div>
      <div>
        <Button className="bg-blue-600">Follow</Button>
      </div>
    </div>
  );
}
