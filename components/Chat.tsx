"use client";

import {
  createChat,
  getChat,
  updateChatMessages,
  updateTitle,
} from "@/services";
import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";
import { Clipboard, Mic, Send } from "react-feather";
import { useChatId } from "./ChatProvider";

export default function Chat({ id }: { id: string | null }) {
  const { setChatId, chatId } = useChatId();

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();

  useEffect(() => {
    if (!id) {
      const id = createChat();
      setChatId(id);
    } else {
      const chat = getChat(id)
      console.log(chat?.title)
      const chatMessages = getChat(id)?.messages;
      if (chatMessages) {
        setMessages(chatMessages);
      }
    }
  }, [chatId]);

  useEffect(() => {
    if (id) {
      updateChatMessages(messages, id);
      if (getChat(id)?.title == "New Chat") {
        updateTitle(messages, id);
      }
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col items-center px-8 border-r-4 border-[#193554]">
      {/* Sue Icon and Title */}
      <div className="flex items-center justify-center gap-3 mt-2 mb-4">
        <span className="text-5xl">👵🏼</span>
        <h1
          className="text-4xl text-[#193554]"
          style={{ fontFamily: "Snell Roundhand, cursive" }}
        >
          Sue
        </h1>
      </div>

      {/* Chat Messages */}
      <div
        className="w-full flex-1 overflow-y-auto mb-6"
        style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 mb-6 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              {message.role === "user" ? (
                <span className="text-3xl">👤</span>
              ) : (
                <span className="text-3xl">👵🏼</span>
              )}
            </div>
            <div
              className={`border-2 rounded-2xl relative p-6 text-base font-medium leading-relaxed max-w-[80%] ${
                message.role === "user"
                  ? "border-[#FA9E20] bg-[#FA9E20]/10 text-[#193554]"
                  : "border-[#193554] bg-[#FFFCF4] text-[#193554]"
              }`}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
              {message.role === "assistant" && (
                <Clipboard
                  size={20}
                  className="absolute top-2 right-2 text-[#193554] cursor-pointer hover:text-[#FA9E20] transition-colors"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="w-full flex items-center pb-6">
        <input
          className="flex-1 bg-[#FFFBEF] border-2 border-[#193554]/20 rounded-lg px-6 py-5 text-lg font-medium shadow focus:outline-none focus:border-[#FA9E20] focus:ring-2 focus:ring-[#FA9E20]/20 text-[#193554] placeholder-[#193554]/60"
          style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          placeholder="Enter a question for Sue to Answer"
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="ml-4 bg-[#FA9E20] hover:bg-[#FA9E20]/80 rounded-full p-4 transition shadow-lg"
        >
          <Send size={24} className="text-[#193554]" />
        </button>
        <button
          type="button"
          className="ml-3 bg-[#FFFCF4] border-2 border-[#193554]/20 rounded-full p-4 hover:bg-[#FFFCF4]/80 transition shadow"
        >
          <Mic size={24} className="text-[#FA9E20]" />
        </button>
      </form>
    </div>
  );
}
