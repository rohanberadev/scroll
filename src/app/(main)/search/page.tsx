import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Search() {
  return (
    <div className="flex h-full w-full flex-col gap-6 p-4 lg:w-[700px]">
      <Tabs
        defaultValue="account"
        className="h-full w-full rounded-md border-[1px] border-gray-800 max-lg:border-none"
      >
        <TabsList className="flex w-full items-center gap-x-4 bg-gray-900">
          <TabsTrigger value="account" className="flex-1">
            People
          </TabsTrigger>
          <TabsTrigger value="password" className="flex-1">
            Hashtags
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      {/* <Input
        type="text"
        className="w-full border-[1px] border-gray-600 py-4 lg:text-lg"
        placeholder="Search username..."
      />
      <div className="h-full w-full rounded-md border-[1px] border-gray-800 max-lg:border-none"></div> */}
    </div>
  );
}
