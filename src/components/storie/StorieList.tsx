import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Avatar from "@/components/user/Avatar";

export default function StorieList() {
  const stories = Array.from({ length: 20 }, (_, i) => `${i}`);

  return (
    <Carousel className="mb-4 w-[350px] border-b-[1px] border-gray-600 p-2 transition-all duration-500 lg:w-[700px]">
      <CarouselContent>
        {stories.map((_, index) => (
          <CarouselItem
            key={index}
            className="flex basis-20 select-none flex-col items-center pl-0 lg:basis-28 lg:gap-y-1"
          >
            <Avatar avatarContainerStyles="w-10 h-10 lg:w-16 lg:h-16 border-[4px] border-rose-600" />
            <span className="text-xs text-gray-400 lg:text-sm">Name</span>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"secondary"}
        size={"sm"}
        className="max-lg:hidden"
      />
      <CarouselNext
        variant={"secondary"}
        size={"sm"}
        className="max-lg:hidden"
      />
    </Carousel>
  );
}
