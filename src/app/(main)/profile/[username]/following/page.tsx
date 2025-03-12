import { FollowingUserCardGroup } from "@/components/user/UserCardGroups";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function FollowingPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <div className="h-full w-full lg:flex lg:items-center lg:justify-center lg:px-4 lg:pt-12">
      <div className="h-full w-full lg:flex lg:min-w-[650px] lg:max-w-[850px] lg:flex-col lg:items-center lg:justify-between lg:gap-y-2">
        <h1 className="mb-8 w-full text-left text-2xl text-gray-200">
          Following
        </h1>
        <div className="flex min-h-[calc(100vh-150px)] w-full justify-center rounded-sm border-[1px] border-gray-800 max-lg:h-screen">
          <FollowingUserCardGroup username={username} />
        </div>
      </div>
    </div>
  );
}
