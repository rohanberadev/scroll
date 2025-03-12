import MessageHeader from "@/components/message/MessageHeader";
import MessageScreen from "@/components/message/MessageScreen";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function UserMessagesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const session = await auth();
  if (!session) redirect("/sign-in");

  const storedUser = await api.message.getUser({ username });
  if (!storedUser) redirect("/not-found");

  return (
    <div className="flex h-full flex-col p-4 max-lg:w-full lg:relative lg:h-screen lg:w-[700px]">
      <div className="h-full w-full overflow-y-auto rounded-md border-[1px] border-gray-800 max-lg:border-none">
        <MessageHeader username={storedUser.name} />
        <MessageScreen sessionUser={session.user} chatUser={storedUser} />
      </div>
    </div>
  );
}
