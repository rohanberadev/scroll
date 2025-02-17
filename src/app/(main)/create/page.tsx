import CreatePostForm from "@/components/post/CreatePostForm";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Create() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-full w-full flex-col lg:w-[700px] lg:p-4">
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <CreatePostForm username={session.user.name} />
      </div>
      {/* <CreatePostTabs /> */}
    </div>
  );
}
