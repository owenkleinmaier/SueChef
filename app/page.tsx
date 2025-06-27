import Chat from "@/components/Chat";
import { ChatIdProvider } from "@/components/ChatProvider";
import ChatWrapper from "@/components/ChatWrapper";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <ChatIdProvider>
      <div className="h-screen bg-[#FBF4E4] flex flex-row">
        <ChatWrapper />
        <Sidebar />
      </div>
    </ChatIdProvider>
  );
}
