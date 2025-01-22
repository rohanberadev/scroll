import SearchTabs from "@/components/tabs/SearchTabs";
import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <div className="flex h-full w-full flex-col lg:w-[700px] lg:p-4">
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <Input placeholder="Search..." className="rounded-sm py-2" />
      </div>
      <div className="flex h-full w-full flex-col gap-y-2 rounded-md border-[1px] border-gray-800 max-lg:border-none">
        <SearchTabs />
      </div>
    </div>
  );
}
