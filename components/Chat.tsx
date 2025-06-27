"use client";

import { getChat, updateChatMessages } from "@/localstorage";
import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";
import {
  Send,
  Mic,
  User,
  Clipboard,
  Clock,
  BarChart2,
  MapPin,
  Settings,
} from "react-feather";

export default function Chat({ id }: { id: string }) {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();

  useEffect(() => {
    const initMessages = getChat(id)?.messages;
    if (initMessages) {
      setMessages(initMessages);
    }
    updateChatMessages(messages, id);
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#f5f3ee] flex flex-col items-center py-4 px-2">
      <div
        className="w-full max-w-5xl bg-white rounded-md border border-gray-300 shadow p-4 flex flex-row gap-0"
        style={{ minHeight: 600 }}
      >
        {/* Left: Chat Section */}
        <div className="flex-1 flex flex-col items-center pr-4 border-r-4 border-[#1a2233]">
          {/* Sue Icon and Title */}
          <div className="flex flex-col items-center mt-2 mb-2">
            <User size={64} className="text-[#1a2233]" />
            <span
              className="font-cursive text-4xl text-[#1a2233] mt-2 mb-2"
              style={{ fontFamily: "Brush Script MT, cursive" }}
            >
              Sue
            </span>
          </div>
          {/* Chat Bubble */}
          <div className="flex flex-row w-full">
            <div className="flex flex-col items-center pt-2">
              <User size={32} className="text-[#1a2233]" />
            </div>
            <div className="flex-1 ml-2">
              <div
                className="border-2 border-[#1a57a6] rounded relative bg-white p-4 text-[1.08rem] font-medium text-[#222] leading-relaxed"
                style={{ minHeight: 320, maxHeight: 340, overflowY: "auto" }}
              >
                Hey there! I’m your kitchen companion — ready to help you prep,
                cook, and clean up with ease. Whether you’re planning a fancy
                dinner or just need a quick lunch, I’ve got recipes, tips, and
                step-by-step guides. You can ask me things like “What can I make
                with tomatoes and rice?” or “Set a timer for 10 minutes.” I can
                walk you through each step of a recipe, suggest substitutes if
                you’re missing ingredients, and even help you build a grocery
                list. Feeling adventurous? I’ll find something new to try. In
                the mood for comfort food? I’ve got just the thing. From knife
                skills to oven timing, I’m here to take the stress out of
                cooking. Want to keep things healthy? I’ll adjust recipes based
                on your goals. You can pause me, skip steps, or ask for visual
                guides anytime. I’ll remember what you like, what you avoid, and
                what you’ve already tried. Let’s turn your kitchen into your
                happy place. Just say the word and we’ll get cooking. I can also
                play music, track your pantry items, or adjust portion sizes.
                Don’t worry if you’re not a pro — we’ll take it one step at a
                time. Ready when you are. Let’s make something delicious
                together.
                {/* Clipboard icon top right */}
                <Clipboard
                  size={22}
                  className="absolute top-2 right-2 text-[#1a57a6] cursor-pointer"
                />
                {/* User icon bottom right */}
                <User
                  size={22}
                  className="absolute bottom-2 right-2 text-[#1a57a6]"
                />
              </div>
            </div>
          </div>
          {/* Input */}
          <form className="w-full flex items-center mt-8">
            <input
              className="flex-1 bg-[#fdf7ea] border-none rounded-lg px-5 py-4 text-lg font-medium shadow focus:outline-none"
              placeholder="Enter a question for Sue to Answer"
            />
            <button
              type="submit"
              className="ml-3 bg-[#ffb85c] hover:bg-[#ff9900] rounded-full p-3 transition"
            >
              <Send size={24} className="text-[#1a2233]" />
            </button>
            <button
              type="button"
              className="ml-2 bg-[#fdf7ea] rounded-full p-3"
            >
              <Mic size={24} className="text-[#ff9900]" />
            </button>
          </form>
        </div>
        {/* Right: Sidebar */}
        <div className="w-[340px] flex flex-col pl-8">
          <div className="text-3xl font-bold text-[#1a2233] mt-2 mb-6">
            Hometown Harvest
          </div>
          <div className="flex flex-col gap-6 flex-1">
            <div className="bg-[#fdf7ea] rounded-lg shadow p-6 text-lg font-medium text-[#1a2233] min-h-[90px] flex items-center justify-center">
              Indiana Local dishes
            </div>
            <div className="bg-[#fdf7ea] rounded-lg shadow p-6 min-h-[90px]" />
          </div>
          {/* Sidebar icons */}
          <div className="flex flex-row justify-between items-center bg-[#fdf7ea] rounded-lg shadow px-6 py-3 mt-8 mb-2">
            <Clipboard size={28} className="text-[#1a2233] cursor-pointer" />
            <Clock size={28} className="text-[#1a2233] cursor-pointer" />
            <BarChart2 size={28} className="text-[#1a2233] cursor-pointer" />
            <MapPin size={28} className="text-[#1a2233] cursor-pointer" />
            <Settings size={28} className="text-[#1a2233] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
