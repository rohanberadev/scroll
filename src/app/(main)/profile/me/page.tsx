import ProfileTabs from "@/components/tabs/ProfileTabs";
import ProfileCard from "@/components/user/ProfileCard";

export default async function Me() {
  return (
    <div className="h-full w-full lg:flex lg:items-center lg:justify-center lg:px-4 lg:pt-12">
      <div className="h-full w-full lg:flex lg:min-w-[650px] lg:max-w-[850px] lg:flex-col lg:items-center lg:justify-between lg:gap-y-2">
        <ProfileCard />
        <ProfileTabs />
      </div>
    </div>
  );
}
