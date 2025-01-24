export default function TabsContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full w-full flex-col items-center rounded-none border-[1px] border-gray-800 max-lg:rounded-b-md lg:min-h-[calc(100vh-150px)]">
      {children}
    </div>
  );
}
