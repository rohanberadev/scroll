import { Input } from "@/components/ui/input";

export default function Messages() {
  return (
    <div className="flex h-full w-full flex-col p-4 lg:w-[700px]">
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <Input placeholder="Search for people..." className="rounded-sm py-2" />
      </div>
      <div className="h-full w-full rounded-md border-[1px] border-gray-800 max-lg:border-none"></div>
    </div>
  );
}
