import {
  MyUserAllTypePostsGrid,
  MyUserFollowerTypePostsGrid,
  MyUserMeTypePostsGrid,
} from "@/components/post/PostGrids";
import TabsContainer from "@/components/tabs/TabsContainer";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import MyTabsTrigger from "./MyTabsTrigger";

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="sticky top-0 z-50 flex w-full items-center justify-between rounded-none border-gray-800 bg-black bg-transparent p-0 max-lg:top-14 lg:gap-x-[0.1rem] lg:rounded-t-md lg:border-l-[1px] lg:border-r-[1px] lg:border-t-[1px]">
        <MyTabsTrigger value="all" label="All" />
        <MyTabsTrigger value="followers" label="Followers" />
        <MyTabsTrigger value="you" label="You" />
      </TabsList>
      <TabsContent value="all" className="mt-3">
        <TabsContainer>
          <MyUserAllTypePostsGrid />
        </TabsContainer>
      </TabsContent>
      <TabsContent value="followers" className="mt-3">
        <TabsContainer>
          <MyUserFollowerTypePostsGrid />
        </TabsContainer>
      </TabsContent>
      <TabsContent value="you" className="mt-3">
        <TabsContainer>
          <MyUserMeTypePostsGrid />
        </TabsContainer>
      </TabsContent>
    </Tabs>
  );
}
