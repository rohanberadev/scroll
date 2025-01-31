import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FiSend } from "react-icons/fi";

type Props = {
  className?: string;
  shareCount?: number;
};

export default function ShareButton({ className, shareCount }: Props) {
  return (
    <Drawer>
      <DrawerTrigger className="flex flex-col items-center gap-[0.15rem]">
        <FiSend className={className} />
        <span className="text-xs">{shareCount}</span>
      </DrawerTrigger>
      <DrawerContent className="h-[400px] w-full rounded-none border-l-[0px] border-r-[0px] border-gray-800 bg-black text-gray-400">
        <DrawerHeader>
          <DrawerTitle>Sharing this post</DrawerTitle>
          <DrawerDescription>
            This post will be shared to the selected profiles.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="w-full p-2">
          <div className="h-8 border-[1px]"></div>
          <div className="h-8 border-[1px]"></div>
          <div className="h-8 border-[1px]"></div>
          <div className="h-8 border-[1px]"></div>
          <div className="h-8 border-[1px]"></div>
          <div className="h-8 border-[1px]"></div>
          <div className="h-8 border-[1px]"></div>
          <div className="h-8 border-[1px]"></div>
        </ScrollArea>
        <DrawerFooter className="flex flex-row">
          <Button>Share</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
