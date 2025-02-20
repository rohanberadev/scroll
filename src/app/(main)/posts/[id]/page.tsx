import ShowPost from "@/components/post/ShowPost";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await api.post.getPostById({ id }).catch((error) => {
    console.error("Error fecthing post by id while requesting trpc:", error);
    redirect("/not-found");
  });

  if (!post) {
    redirect("/not-found");
  }

  return (
    <div className="flex lg:py-6">
      <ShowPost post={post} />
    </div>
  );
}
