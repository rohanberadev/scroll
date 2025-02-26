import { Input } from "../ui/input";

export default function SearchPeople() {
  const array = Array.from({ length: 10 });

  return (
    <>
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <Input placeholder="Search..." className="rounded-sm py-2" />
      </div>
      <div className="flex h-full w-full flex-col items-center rounded-none border-[1px] border-gray-800 max-lg:rounded-b-md lg:min-h-[calc(100vh-150px)]"></div>
    </>
  );
}
