import CreatePost from "@/components/post/CreatePost";
import CreatePostTabs from "@/components/tabs/CreatePostTabs";

export default function Create() {
  return (
    <div className="flex h-full w-full flex-col lg:w-[700px] lg:p-4">
      <div className="w-full border-gray-800 max-lg:border-b-[1px] max-lg:p-4 lg:mb-4">
        <CreatePost />
      </div>
      <CreatePostTabs />
    </div>
  );
}
