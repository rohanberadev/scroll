import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { TbDots } from "react-icons/tb";

function PublicPostInfo(props: { username: string; postedAt: Date }) {
  return (
    <div className="flex h-full w-full flex-col text-gray-400">
      <Link
        href={`/profile/${props.username}`}
        className="flex w-full items-center justify-center border-t-[1px] border-gray-600 p-4 text-lg text-blue-500"
      >
        Profile
      </Link>
      <div className="flex w-full items-center justify-center border-t-[1px] border-gray-600 p-4 text-lg">
        Uploaded by {props.username}
      </div>
      <div className="flex w-full items-center justify-center border-t-[1px] border-gray-600 p-4 text-lg">
        Uploaded at {new Date(props.postedAt).toDateString()}
      </div>
      <DialogClose
        asChild
        className="flex w-full cursor-pointer items-center justify-center border-[1px] border-gray-600 p-4 text-lg"
      >
        <span className="text-red-600">Close</span>
      </DialogClose>
    </div>
  );
}

function MyPostInfo(props: { username: string; postedAt: Date }) {
  return (
    <div className="flex h-full w-full flex-col text-gray-400">
      <div className="flex w-full items-center justify-center border-t-[1px] border-gray-600 p-4 text-lg">
        Uploaded at {new Date(props.postedAt).toDateString()}
      </div>
      <DialogClose
        asChild
        className="flex w-full cursor-pointer items-center justify-center border-[1px] border-gray-600 p-4 text-lg"
      >
        <span className="text-red-600">Close</span>
      </DialogClose>
    </div>
  );
}

export default function PostInfoButton(props: {
  username: string;
  postedAt: Date;
  isPostOwner: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <TbDots className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="w-full translate-x-[-50%] border-gray-600 bg-black p-0 text-gray-400 max-lg:w-[90%] lg:left-[60%] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="p-4 text-center">
            {props.isPostOwner ? (
              <p>This is your post info</p>
            ) : (
              <p>This is your post info</p>
            )}
          </DialogTitle>
          {props.isPostOwner ? (
            <MyPostInfo username={props.username} postedAt={props.postedAt} />
          ) : (
            <PublicPostInfo
              username={props.username}
              postedAt={props.postedAt}
            />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
