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
      <DrawerContent className="h-[400px] w-full rounded-none border-l-[0px] border-r-[0px] border-gray-400 bg-black text-gray-400">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
