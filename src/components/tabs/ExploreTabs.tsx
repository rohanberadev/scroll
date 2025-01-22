import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyTabsTrigger from "./MyTabsTrigger";
import PostsGrid from "@/components/post/PostsGrid";

export default function ExploreTabs() {
  return (
    <Tabs defaultValue="people" className="w-full">
      <TabsList className="z-50 flex w-full items-center justify-between rounded-none border-gray-800 bg-black bg-transparent p-0 max-lg:sticky max-lg:top-0 lg:gap-x-[0.1rem] lg:rounded-t-md lg:border-l-[1px] lg:border-r-[1px] lg:border-t-[1px]">
        <MyTabsTrigger value="people" label="People" />
        <MyTabsTrigger value="posts" label="Posts" />
        <MyTabsTrigger value="hashtags" label="Hashtags" />
      </TabsList>
      <TabsContent value="people">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="posts" className="mt-0 flex w-full items-center">
        <PostsGrid heightMinusOffset={80} />
      </TabsContent>
      <TabsContent value="hashtags">This is hashtags.</TabsContent>
    </Tabs>
  );
}
