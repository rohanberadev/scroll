import { TopPublicPosts } from "@/components/post/PostGrids";
import TabsContainer from "@/components/tabs/TabsContainer";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import TopPeople from "@/components/user/TopPeople";
import MyTabsTrigger from "./MyTabsTrigger";

export default function ExploreTabs() {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="sticky top-0 z-50 flex w-full items-center justify-between rounded-none border-gray-800 bg-black bg-transparent p-0 max-lg:top-14 lg:gap-x-[0.1rem] lg:rounded-t-md lg:border-l-[1px] lg:border-r-[1px] lg:border-t-[1px]">
        <MyTabsTrigger value="posts" label="Posts" />
        <MyTabsTrigger value="people" label="People" />
      </TabsList>
      <TabsContent value="posts" className="mt-3">
        <TabsContainer>
          <TopPublicPosts />
        </TabsContainer>
      </TabsContent>
      <TabsContent value="people" className="mt-3">
        <TabsContainer>
          <TopPeople />
        </TabsContainer>
      </TabsContent>
    </Tabs>
  );
}
