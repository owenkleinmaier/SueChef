import { generateText, UIMessage } from "ai";
import { getLocalStorageItem } from "./lib/utils";
import { Chat } from "./types/chats";
import { v4 as uuidv4 } from "uuid";
import { openai } from "@ai-sdk/openai";

export function updateChatMessages(messages: UIMessage[], id: string) {
  const allChats = getLocalStorageItem<Chat[]>("chats");
  if (!allChats) {
    return;
  }

  let chatIndex = null;
  for (let i = 0; i < allChats?.length; i++) {
    if (allChats[i].id == id) {
      console.log("We found index", i);
      chatIndex = i;
    }
  }

  if (chatIndex == null) {
    return;
  }

  allChats[chatIndex].messages = messages;
  console.log("New messages", allChats[chatIndex].messages);
  localStorage.setItem("chats", JSON.stringify(allChats));
}

export function getChat(id: string) {
  const chats = getLocalStorageItem<Chat[]>("chats");
  return chats?.find((chat) => chat.id == id);
}

export function createChat() {
  const newChat = {
    title: "New Chat",
    id: uuidv4(),
    created_at: new Date(),
    messages: [],
  };

  const chats: Chat[] = getLocalStorageItem("chats") || [];
  chats.push(newChat);
  localStorage.setItem("chats", JSON.stringify(chats));
  return newChat.id;
}

export function getChats() {
  const chats = getLocalStorageItem<Chat[]>("chats");
  return chats;
}

export async function updateTitle(messages: UIMessage[], id: string) {
  const titleRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/chat/title`,
    {
      method: "POST",
      body: JSON.stringify({
        messages,
      }),
    }
  );

  const title = await titleRes.json();

  const allChats = getLocalStorageItem<Chat[]>("chats");
  if (!allChats) {
    return;
  }

  let chatIndex = null;
  for (let i = 0; i < allChats?.length; i++) {
    if (allChats[i].id == id) {
      chatIndex = i;
    }
  }

  if (chatIndex == null) {
    return;
  }

  allChats[chatIndex].title = title;
  localStorage.setItem("chats", JSON.stringify(allChats));
}
