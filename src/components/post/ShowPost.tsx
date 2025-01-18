import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { TbDots } from "react-icons/tb";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import Avatar from "@/components/user/Avatar";
import LikeButton from "@/components/button/LikeButton";

const imageSrc1 =
  "https://plus.unsplash.com/premium_photo-1675127367513-7f4388aa9076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbHxlbnwwfDF8MHx8fDA%3D";

const imageSrc2 =
  "https://plus.unsplash.com/premium_photo-1675433344518-21eb72dfc7a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const imageSrc3 =
  "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=600";

const imageArray = [imageSrc1, imageSrc2, imageSrc3];

function PostMedia() {
  function Dots({ count, current }: { count: number; current: number }) {
    const iterator = Array.from({ length: count });

    return (
      <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-x-2 rounded-lg bg-black px-4 py-1 opacity-70">
        {iterator.map((_, index) => (
          <div
            className={cn(
              "h-2 w-2 rounded-full bg-gray-600 transition-colors duration-300",
              index === current ? "bg-white" : "",
            )}
            key={index}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <Carousel className="relative">
      <CarouselContent className="-ml-0">
        {imageArray.map((imageUrl, index) => (
          <CarouselItem
            key={index}
            className="relative select-none pl-[1px] pr-[1px]"
          >
            <AspectRatio ratio={5 / 6}>
              <Image
                src={imageUrl}
                fill
                alt="image1"
                className="object-cover"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>

      {imageArray.length > 1 ? (
        <Dots count={imageArray.length} current={0} />
      ) : null}
    </Carousel>
  );
}

function PostInfo() {
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

function ShareDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <FiSend className="h-5 w-5" />
      </DrawerTrigger>
      <DrawerContent className="h-[400px] w-full bg-black text-gray-400">
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

export default function ShowPost() {
  return (
    <Card className="max-xs:border-none flex w-[400px] flex-col rounded-sm bg-black text-stone-400 md:w-[425px] lg:w-[450px] lg:border-[1px] lg:border-gray-400">
      <CardHeader className="flex w-full flex-row items-center justify-between border-b-[1px] border-gray-400 p-4">
        <Link href={"#"} className="flex items-center gap-x-4">
          <Avatar />
          <CardTitle>Username</CardTitle>
        </Link>
        <PostInfo />
      </CardHeader>
      <CardContent className="w-full p-0">
        <PostMedia />
      </CardContent>
      <CardFooter className="flex flex-1 flex-col gap-y-6 border-t-[1px] border-gray-400 pt-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-x-6">
            <LikeButton
              active={true}
              className="h-[1.4rem] w-[1.4rem] text-red-600"
            />
            <FaRegComment className="h-5 w-5" />
            <ShareDrawer />
          </div>
          <BsBookmark className="h-5 w-5" />
        </div>

        <div className="flex w-full justify-start">
          <p className="text-sm">
            Liked by <span className="font-bold">username</span> and{" "}
            <span className="font-bold">200 others</span>
          </p>
        </div>

        <div className="flex w-full flex-col justify-start text-sm">
          <p>This is the post description...</p>
          <span>Viewed by 20k</span>
        </div>
      </CardFooter>
    </Card>
  );
}
