import ShowPost from "@/components/post/ShowPost";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  const posts = Array.from({ length: 2 }, (_, i) => `${i + 1}`);

  return (
    <div className="flex w-full flex-col items-center lg:pt-6">
      <div className="flex flex-col items-center lg:gap-y-12 lg:py-4">
        {posts.map((_, index) => (
          <ShowPost key={index} />
        ))}
      </div>
    </div>
  );
}
