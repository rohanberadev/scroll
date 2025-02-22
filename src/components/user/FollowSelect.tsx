import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FollowSelect() {
  return (
    <Select>
      <SelectTrigger className="h-[25px] w-[120px] border-gray-600">
        <SelectValue placeholder="following" />
      </SelectTrigger>
      <SelectContent className="bg-black text-gray-100">
        <SelectItem value="following" className="h-[25px]">
          Following
        </SelectItem>
        <SelectItem value="unfollow" className="h-[25px] text-red-600">
          Unfollow
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
