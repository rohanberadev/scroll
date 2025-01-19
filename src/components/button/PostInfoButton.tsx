import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TbDots } from "react-icons/tb";

export default function PostInfoButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <TbDots className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="h-56 w-full bg-black text-gray-400 max-lg:w-[90%] lg:left-[60%]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
