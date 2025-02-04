import Avatar from "@/components/user/Avatar";

export default async function Me() {
  return (
    <div className="h-full w-full lg:flex lg:items-center lg:justify-center lg:px-4 lg:pt-12">
      <div className="h-full w-full lg:flex lg:min-w-[650px] lg:max-w-[850px] lg:items-center lg:justify-between">
        <div className="flex w-full items-center justify-between rounded-t-lg border-gray-600 p-6 max-lg:border-b-[1px] lg:border-[1px]">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <Avatar avatarContainerStyles="w-[100px] lg:w-[130px] h-auto rounded-full border-[4px] border-gray-200" />
            <span className="text-xl text-gray-300 lg:text-2xl">Username</span>
          </div>
          <div>
            <h1 className="text-2xl text-gray-300">Username</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
