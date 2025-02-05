import InputMessageBox from "@/components/message/InputMessageBox";
import MessageHeader from "@/components/message/MessageHeader";

export default function MessagesId() {
  return (
    <div className="flex h-full flex-col p-4 max-lg:w-full lg:relative lg:h-screen lg:w-[700px]">
      <div className="h-full w-full overflow-y-auto rounded-md border-[1px] border-gray-800 max-lg:border-none">
        <MessageHeader />
        <div className="h-[3000px]"></div>
        <InputMessageBox />
      </div>
    </div>
  );
}
