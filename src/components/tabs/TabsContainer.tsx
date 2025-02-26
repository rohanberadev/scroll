import { cn } from "@/lib/utils";

export default function TabsContainer({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[calc(100vh-150px)] w-full flex-col items-center rounded-none border-[1px] border-gray-800 max-lg:rounded-b-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
