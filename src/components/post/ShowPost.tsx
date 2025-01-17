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

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const imageSrc1 =
  "https://plus.unsplash.com/premium_photo-1675127367513-7f4388aa9076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJhbHxlbnwwfDF8MHx8fDA%3D";

const imageSrc2 =
  "https://plus.unsplash.com/premium_photo-1675433344518-21eb72dfc7a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function PostMedia() {
  return (
    <Carousel className="flex h-full w-full items-center">
      <CarouselContent className="relative">
        <CarouselItem className="h-full w-[450px]">
          <AspectRatio ratio={5 / 6}>
            <Image src={imageSrc1} fill alt="image1" className="object-cover" />
          </AspectRatio>
        </CarouselItem>

        <CarouselItem className="h-full w-full">
          <AspectRatio ratio={5 / 6}>
            <Image src={imageSrc2} fill alt="image1" className="object-cover" />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default function ShowPost() {
  return (
    <Card className="flex h-[650px] w-[400px] flex-col rounded-sm border-gray-400 bg-black text-stone-400 sm:w-[400px] md:w-[425px] lg:h-[750px] lg:w-[450px]">
      <CardHeader className="w-full border-b-[1px] border-gray-400">
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="h-[550px] w-full">
        <PostMedia />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
