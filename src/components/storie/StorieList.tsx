import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Avatar from "@/components/user/Avatar";

export default function StorieList() {
  const stories = Array.from({ length: 20 }, (_, i) => `${i}`);

  return (
    <Carousel className="relative mb-4 w-full border-b-[1px] border-gray-600 p-2 transition-all duration-500 lg:w-[700px]">
      <CarouselContent>
        {stories.map((_, index) => (
          <CarouselItem
            key={index}
            className="flex basis-24 select-none flex-col items-center pl-0 lg:basis-28 lg:gap-y-1"
          >
            <Avatar avatarContainerStyles="w-12 h-12 lg:w-16 lg:h-16 border-[4px] border-rose-600" />
            <span className="text-xs text-gray-400 lg:text-sm">Name</span>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
