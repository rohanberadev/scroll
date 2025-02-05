import { Textarea } from "@/components/ui/textarea";

export default function InputMessageBox() {
  return (
    <Textarea
      className="lg: flex h-14 w-full items-center gap-x-6 rounded-md border-b-[1px] border-gray-600 bg-black px-4 shadow-lg max-lg:fixed max-lg:bottom-16 max-lg:left-0 max-lg:z-50 max-lg:w-[98%] lg:sticky lg:bottom-0 lg:left-0 lg:h-20 lg:rounded-none lg:border-b-0 lg:border-l-0 lg:border-r-0 lg:border-t-[1px]"
      placeholder="Message..."
    />
  );
}
