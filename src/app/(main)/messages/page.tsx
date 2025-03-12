import { Input } from "@/components/ui/input";
import UserMessageCard from "@/components/user/UserMessageCard";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const followers = await api.user.getInfiniteFollowersOfUser({
    username: session.user.name,
  });
  const following = await api.user.getInfiniteFollowingOfUser({
    username: session.user.name,
  });

  const users = Array.from(
    new Map(
      [...followers, ...following].map((user) => [user.id, user]),
    ).values(),
  );

  return (
    <div className="flex h-full w-full flex-col lg:w-[700px] lg:p-4">
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <Input
          placeholder="Search for people..."
          className="rounded-sm border-gray-700 py-2"
        />
      </div>
      <div className="h-full min-h-screen w-full rounded-md border-[1px] border-gray-800 max-lg:border-none max-lg:px-4 max-lg:pt-4 lg:p-4">
        {users.map(
          (user, index) => user && <UserMessageCard key={index} user={user} />,
        )}
      </div>
    </div>
  );
}
