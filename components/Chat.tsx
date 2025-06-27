"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Mic, Clipboard } from "react-feather";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

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
      <div className="w-full flex-1 overflow-y-auto mb-6" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
        {messages.length === 0 && (
          <div className="flex items-start gap-3 mb-6">
            <div className="flex-shrink-0 mt-1">
              <span className="text-3xl">👵🏼</span>
            </div>
            <div
              className="border-2 border-[#193554] rounded-2xl relative bg-[#FFFCF4] p-5 text-base font-medium text-[#193554] leading-relaxed max-w-[80%]"
            >
              Hey there! I'm your kitchen companion — ready to help you prep,
              cook, and clean up with ease. Whether you're planning a fancy
              dinner or just need a quick lunch, I've got recipes, tips, and
              step-by-step guides. You can ask me things like "What can I make
              with tomatoes and rice?" or "Set a timer for 10 minutes." I can
              walk you through each step of a recipe, suggest substitutes if
              you're missing ingredients, and even help you build a grocery
              list. Feeling adventurous? I'll find something new to try. In
              the mood for comfort food? I've got just the thing. From knife
              skills to oven timing, I'm here to take the stress out of
              cooking. Want to keep things healthy? I'll adjust recipes based
              on your goals. You can pause me, skip steps, or ask for visual
              guides anytime. I'll remember what you like, what you avoid, and
              what you've already tried. Let's turn your kitchen into your
              happy place. Just say the word and we'll get cooking. I can also
              play music, track your pantry items, or adjust portion sizes.
              Don't worry if you're not a pro — we'll take it one step at a
              time. Ready when you are. Let's make something delicious
              together.
              <Clipboard
                size={20}
                className="absolute top-3 right-3 text-[#193554] cursor-pointer hover:text-[#FA9E20] transition-colors"
              />
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 mb-6 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className="flex-shrink-0 mt-1">
              {message.role === "user" ? (
                <span className="text-3xl">👤</span>
              ) : (
                <span className="text-3xl">👵🏼</span>
              )}
            </div>
            <div
              className={`border-2 rounded-2xl relative p-5 text-base font-medium leading-relaxed max-w-[80%] ${
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
                  className="absolute top-3 right-3 text-[#193554] cursor-pointer hover:text-[#FA9E20] transition-colors"
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