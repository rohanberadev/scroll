import { TabsTrigger } from "@/components/ui/tabs";

type Props = {
  label: string;
  value: string;
};

export default function MyTabsTrigger({ label, value }: Props) {
  return (
    <TabsTrigger
      value={value}
      className="flex-1 rounded-none border-gray-400 py-4 data-[state=active]:border-b-[1px] data-[state=active]:bg-transparent data-[state=active]:text-stone-50"
    >
      {label}
    </TabsTrigger>
  );
}
