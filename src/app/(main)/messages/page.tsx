import { Input } from "@/components/ui/input";
import UserMessageCard from "@/components/user/UserMessageCard";

export default function Messages() {
  return (
    <div className="flex h-full w-full flex-col p-4 lg:w-[700px]">
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <Input placeholder="Search for people..." className="rounded-sm py-2" />
      </div>
      <div className="h-full min-h-screen w-full rounded-md border-[1px] border-gray-800 p-4 max-lg:border-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <UserMessageCard key={i} />
        ))}
      </div>
    </div>
  );
}
