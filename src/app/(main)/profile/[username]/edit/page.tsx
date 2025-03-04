import EditProfileForm from "@/components/user/EditProfileForm";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const session = await auth();

  if (!session) redirect("/sign-in");
  if (username !== session.user.name) redirect("/unauthorized");

  const user = await api.user.getMe();
  if (!user) redirect("/not-found");

  return (
    <div className="flex h-full w-full flex-col lg:w-[700px] lg:p-4">
      <h1 className="pt-8 text-3xl text-gray-200">Edit your profile</h1>
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <EditProfileForm user={user} />
      </div>
    </div>
  );
}
