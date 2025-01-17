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

const imageSrc =
  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg";

function PostMedia() {
  return (
    <Carousel className="h-full w-full">
      <CarouselContent className="flex h-full w-full items-center justify-center">
        <CarouselItem>
          <Image src={imageSrc} alt="image" width={450} height={600} />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function ShowPost() {
  return (
    <Card className="flex h-[95vh] w-[350px] flex-col rounded-sm border-gray-400 bg-black text-stone-400 lg:w-[450px]">
      <CardHeader className="w-full border-b-[1px] border-gray-400">
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <PostMedia />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
