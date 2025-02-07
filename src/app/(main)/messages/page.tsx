import { Input } from "@/components/ui/input";
import UserMessageCard from "@/components/user/UserMessageCard";

export default function Messages() {
  return (
    <div className="flex h-full w-full flex-col lg:w-[700px] lg:p-4">
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <Input
          placeholder="Search for people..."
          className="rounded-sm border-gray-700 py-2"
        />
      </div>
      <div className="h-full min-h-screen w-full rounded-md border-[1px] border-gray-800 max-lg:border-none max-lg:px-4 max-lg:pt-4 lg:p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <UserMessageCard key={i} />
        ))}
      </div>
    </div>
  );
}
