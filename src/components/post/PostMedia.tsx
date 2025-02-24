"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  SupabasePublicImage,
  SupabaseSignedImage,
} from "@/components/image/SupabaseImage";

import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";

export default function PostMedia(props: {
  files: {
    path: string;
    id: string;
    createdAt: Date;
    fullPath: string;
    postId: string | null;
    publicUrl: string | null;
  }[];
  postType: "PRIVATE" | "PUBLIC" | "DRAFT";
}) {
  const { files } = props;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const Dots = ({ count, current }: { count: number; current: number }) => {
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
  };

  return (
    <Carousel className="relative" setApi={setApi}>
      <CarouselContent className="-ml-0">
        {files.map((file, index) => (
          <CarouselItem
            key={index}
            className="relative select-none pl-[1px] pr-[1px]"
          >
            <AspectRatio ratio={5 / 6}>
              {file.publicUrl ? (
                <SupabasePublicImage publicUrl={file.publicUrl} />
              ) : (
                <SupabaseSignedImage file={file} />
              )}
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>

      {files.length > 1 ? (
        <Dots count={files.length} current={current} />
      ) : null}
    </Carousel>
  );
}
