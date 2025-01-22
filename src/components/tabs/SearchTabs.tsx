import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyTabsTrigger from "./MyTabsTrigger";

export default function SearchTabs() {
  return (
    <Tabs defaultValue="people" className="w-full">
      <TabsList className="flex w-full items-center justify-between gap-x-[0.1rem] bg-transparent p-0">
        <MyTabsTrigger value="people" label="People" />
        <MyTabsTrigger value="hashtags" label="Hashtags" />
      </TabsList>
      <TabsContent value="people">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="hashtags">Change your password here.</TabsContent>
    </Tabs>
  );
}
