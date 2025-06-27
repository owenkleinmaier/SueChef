import Chat from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-[#FBF4E4] flex flex-row">
      <Chat />
      <Sidebar />
    </div>
  );
}