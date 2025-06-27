"use client";

import Chat, { ChatRef } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { ChatIdProvider } from "@/components/ChatProvider";
import ChatWrapper from "@/components/ChatWrapper";
import { useRef } from "react";

function AppContent() {
  const { isOnboardingComplete, completeOnboarding } = useUser();
  const chatRef = useRef<ChatRef>(null);

  const handleSuggestionClick = (suggestion: string) => {
    if (chatRef.current) {
      chatRef.current.setInput(suggestion);
    }
  };

  if (!isOnboardingComplete) {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  return (
    <div className="h-screen bg-[#FBF4E4] flex flex-row">
      <Chat ref={chatRef} />
      <Sidebar onSuggestionClick={handleSuggestionClick} />
    </div>
  );
}

export default function Home() {
  return (
    <UserProvider>
      <ChatIdProvider>
        <AppContent />
      </ChatIdProvider>
    </UserProvider>
  );
}
