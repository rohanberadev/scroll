import ExploreTabs from "@/components/tabs/ExploreTabs";

export default function Explore() {
  return (
    <div className="flex h-full w-full flex-col gap-6 lg:w-[700px] lg:p-4">
      <div className="h-full w-full rounded-md border-[1px] border-gray-800 max-lg:border-none">
        <ExploreTabs />
      </div>
    </div>
  );
}
