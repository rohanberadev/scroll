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

import { FaRegComment } from "react-icons/fa";

type Props = {
  className?: string;
  commentCount?: number;
};

export default function CommentButton({ className, commentCount }: Props) {
  return (
    <Drawer>
      <DrawerTrigger className="flex flex-col items-center gap-[0.15rem]">
        <FaRegComment className={className} />
        <span className="text-xs">{commentCount}</span>
      </DrawerTrigger>
      <DrawerContent className="h-[500px] w-full rounded-none border-l-[0px] border-r-[0px] border-gray-800 bg-black text-gray-400 max-lg:h-full">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
