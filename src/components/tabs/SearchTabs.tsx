import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import MyTabsTrigger from "@/components/tabs/MyTabsTrigger";
import UserCard from "@/components/user/UserCard";
import TabsContainer from "./TabsContainer";

export default function SearchTabs() {
  const array = Array.from({ length: 10 });

  return (
    <Tabs defaultValue="people" className="w-full">
      <TabsList className="sticky top-0 z-50 flex w-full items-center justify-between rounded-none border-gray-800 bg-black bg-transparent p-0 max-lg:sticky max-lg:top-14 lg:gap-x-[0.1rem] lg:rounded-t-md lg:border-l-[1px] lg:border-r-[1px] lg:border-t-[1px]">
        <MyTabsTrigger value="people" label="People" />
        <MyTabsTrigger value="hashtags" label="Hashtags" />
      </TabsList>
      <TabsContent value="people" className="mt-3">
        <TabsContainer>
          {array.map((_, i) => (
            <UserCard key={i} />
          ))}
        </TabsContainer>
      </TabsContent>
      <TabsContent value="hashtags" className="mt-3">
        <TabsContainer>This is hashtags</TabsContainer>
      </TabsContent>
    </Tabs>
  );
}
