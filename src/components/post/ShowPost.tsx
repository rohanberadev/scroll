import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { FaRegComment } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { TbDots } from "react-icons/tb";

import Image from "next/image";
import Avatar from "@/components/user/Avatar";

const imageSrc1 =
  "https://plus.unsplash.com/premium_photo-1675127367513-7f4388aa9076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbHxlbnwwfDF8MHx8fDA%3D";

const imageSrc2 =
  "https://plus.unsplash.com/premium_photo-1675433344518-21eb72dfc7a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const imageSrc3 =
  "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=600";

const imageArray = [imageSrc1, imageSrc2, imageSrc3];

function PostMedia() {
  return (
    <Carousel>
      <CarouselContent className="relative -ml-0">
        {imageArray.map((imageUrl, index) => (
          <CarouselItem key={index} className="select-none pl-[1px] pr-[1px]">
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
    </Carousel>
  );
}

export default function ShowPost() {
  return (
    <Card className="flex w-[400px] flex-col rounded-sm border-gray-400 bg-black text-stone-400 sm:w-[400px] md:w-[425px] lg:w-[450px]">
      <CardHeader className="flex w-full flex-row items-center justify-between border-b-[1px] border-gray-400 p-4">
        <div className="flex items-center gap-x-4">
          <Avatar />
          <CardTitle>Username</CardTitle>
        </div>
        <TbDots className="h-6 w-6" />
      </CardHeader>
      <CardContent className="w-full p-0">
        <PostMedia />
      </CardContent>
      <CardFooter className="flex flex-1 flex-col gap-y-6 border-t-[1px] border-gray-400 pt-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-x-6">
            <GoHeart className="h-[1.4rem] w-[1.4rem]" />
            <FaRegComment className="h-5 w-5" />
            <FiSend className="h-5 w-5" />
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
