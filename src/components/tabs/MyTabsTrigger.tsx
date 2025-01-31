import { TabsTrigger } from "@/components/ui/tabs";

type Props = {
  label: string;
  value: string;
};

export default function MyTabsTrigger({ label, value }: Props) {
  return (
    <TabsTrigger
      value={value}
      className="flex-1 rounded-none border-gray-100 bg-black py-4 data-[state=active]:border-b-[1px] data-[state=active]:bg-black data-[state=active]:text-stone-50 lg:rounded-t-lg"
    >
      {label}
    </TabsTrigger>
  );
}
