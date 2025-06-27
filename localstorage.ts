import { UIMessage } from "ai";
import { getLocalStorageItem } from "./lib/utils";
import { Chat } from "./types/chats";
import { v4 as uuidv4 } from "uuid";

export function updateChatMessages(messages: UIMessage[], id: string) {
  const allChats = getLocalStorageItem<Chat[]>("chats");
  if (!allChats) {
    return Response.json(null);
  }
  let chatIndex = null;
  for (let i = 0; i < allChats?.length; i++) {
    if (allChats[i].id == id) {
      chatIndex = i;
    }
  }

  if (!chatIndex) {
    return Response.json(null);
  }

  allChats[chatIndex].messages = messages;
  localStorage.setItem("chats", JSON.stringify(allChats));
}

export function getChat(id: string) {
  const chats = getLocalStorageItem<Chat[]>("chats");
  return chats?.find((chat) => chat.id == id);
}

export function createChat() {
  const newChat = {
    id: uuidv4(),
    created_at: new Date(),
    messages: [],
  };

  const chats: Chat[] = getLocalStorageItem("chats") || [];
  chats.push(newChat);
  localStorage.setItem("chats", JSON.stringify(chats))
}

export function getChats() {
  const chats = getLocalStorageItem<Chat[]>("chats");
  return chats
}
