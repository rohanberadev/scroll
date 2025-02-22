import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FollowButton(props: { className?: string }) {
  const { className } = props;

  return <Button className={cn("bg-blue-600", className)}>Follow</Button>;
}
