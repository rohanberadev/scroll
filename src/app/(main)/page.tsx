import ShowPost from "@/components/post/ShowPost";
import { auth } from "@/server/auth";

export default async function Home() {
  // const users = await api.user
  //   .getUser()
  //   .catch((error: Error) => redirect("/sign-in"));

  const session = await auth();

  return <>{JSON.stringify(session)}</>;

  const posts = Array.from({ length: 2 }, (_, i) => `${i + 1}`);

  return (
    <div className="flex w-full flex-col items-center lg:pt-6">
      {/* <StorieList /> */}

      <div className="flex flex-col items-center lg:gap-y-12 lg:py-4">
        {posts.map((_, index) => (
          <ShowPost key={index} />
        ))}
      </div>
    </div>
  );
}
