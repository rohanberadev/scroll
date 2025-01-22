import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

type Props = {
  heightMinusOffset: number;
};

export default function PostsGrid({ heightMinusOffset }: Props) {
  const imageUrl =
    "https://images.unsplash.com/photo-1517135399940-2855f5be7c4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJhbHxlbnwwfHwwfHx8MA%3D%3D";
  const array = Array.from({ length: 21 }, (_, i) => imageUrl);

  return (
    <div
      className={cn(
        "grid w-full grid-cols-3 justify-items-center overflow-auto pt-[2px] first-letter:lg:rounded-b-md",
        `lg:h-[calc(100vh-${heightMinusOffset}px)]`,
      )}
    >
      {array.map((url, index) => (
        <AspectRatio key={index} ratio={1 / 1} className="m-[1px]">
          <Image src={url} fill alt="image" />
        </AspectRatio>
      ))}
    </div>
  );
}
