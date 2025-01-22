import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyTabsTrigger from "./MyTabsTrigger";

export default function ExploreTabs() {
  return (
    <Tabs defaultValue="people" className="w-full p-0">
      <TabsList className="flex h-full w-full items-center justify-between gap-x-[0.1rem] bg-transparent p-0">
        <MyTabsTrigger value="people" label="People" />
        <MyTabsTrigger value="posts" label="Posts" />
        <MyTabsTrigger value="hashtags" label="Hashtags" />
      </TabsList>
      <TabsContent value="people">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="posts">Change your password here.</TabsContent>
      <TabsContent value="hashtags">This is hashtags.</TabsContent>
    </Tabs>
  );
}
