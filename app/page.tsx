import Chat from "@/components/Chat";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-24 px-12 flex flex-1 justify-center items-center w-screen h-screen">
      <Chat/>
    </div>
  );
}
