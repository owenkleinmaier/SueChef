"use client";

import Chat from "./Chat";
import { useChatId } from "./ChatProvider";

export default function ChatWrapper() {
  const { chatId: id } = useChatId();

  return <Chat id={id} />;
}
