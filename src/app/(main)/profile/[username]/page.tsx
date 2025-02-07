import PostsGrid from "@/components/post/PostsGrid";
import ProfileTabs from "@/components/tabs/ProfileTabs";
import ProfileCard from "@/components/user/ProfileCard";
import { auth } from "@/server/auth";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const authUser = "rohan";
  const a = await auth();

  return (
    <div className="h-full w-full lg:flex lg:items-center lg:justify-center lg:px-4 lg:pt-12">
      <div className="h-full w-full lg:flex lg:min-w-[650px] lg:max-w-[850px] lg:flex-col lg:items-center lg:justify-between lg:gap-y-2">
        <ProfileCard enableFollowBtn={authUser !== username} />
        {authUser === username ? (
          <ProfileTabs />
        ) : (
          <PostsGrid heightMinusOffset={80} />
        )}
      </div>
    </div>
  );
}
