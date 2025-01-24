import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import MyTabsTrigger from "./MyTabsTrigger";
import PostsGrid from "@/components/post/PostsGrid";
import TabsContainer from "@/components/tabs/TabsContainer";

export default function CreatePostTabs() {
  return (
    <Tabs defaultValue="public" className="w-full">
      <TabsList className="sticky top-0 z-50 flex w-full items-center justify-between rounded-none border-gray-800 bg-black bg-transparent p-0 max-lg:top-14 lg:gap-x-[0.1rem] lg:rounded-t-md lg:border-l-[1px] lg:border-r-[1px] lg:border-t-[1px]">
        <MyTabsTrigger value="public" label="Public" />
        <MyTabsTrigger value="private" label="Private" />
        <MyTabsTrigger value="draft" label="Draft" />
      </TabsList>
      <TabsContent value="public" className="mt-3">
        <TabsContainer className="lg:min-h-[calc(100vh-250px)]">
          <PostsGrid heightMinusOffset={80} />
        </TabsContainer>
      </TabsContent>
      <TabsContent value="private" className="mt-3">
        <TabsContainer className="lg:min-h-[calc(100vh-250px)]">
          <PostsGrid heightMinusOffset={80} />
        </TabsContainer>
      </TabsContent>
      <TabsContent value="draft" className="mt-3">
        <TabsContainer className="lg:min-h-[calc(100vh-250px)]">
          <PostsGrid heightMinusOffset={80} />
        </TabsContainer>
      </TabsContent>
    </Tabs>
  );
}
