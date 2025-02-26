import { UserPublicPostsGrid } from "@/components/post/PostGrids";
import ProfileTabs from "@/components/tabs/ProfileTabs";
import ProfileCard from "@/components/user/ProfileCard";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await api.user.getUserByUsername({ username });

  if (!user) {
    redirect("/not-found");
  }

  return (
    <div className="h-full w-full lg:flex lg:items-center lg:justify-center lg:px-4 lg:pt-12">
      <div className="h-full w-full lg:flex lg:min-w-[650px] lg:max-w-[850px] lg:flex-col lg:items-center lg:justify-between lg:gap-y-2">
        <ProfileCard
          enableFollowBtn={!(user.isProfileOwner || user.isFollowedByUser)}
          username={user.name}
          followers={user.followers}
          following={user.following}
          posts={user.posts}
          userId={user.id}
          isProfileOwner={user.isProfileOwner}
        />
        {user.isProfileOwner ? (
          <ProfileTabs />
        ) : (
          <UserPublicPostsGrid userId={user.id} />
        )}
      </div>
    </div>
  );
}
