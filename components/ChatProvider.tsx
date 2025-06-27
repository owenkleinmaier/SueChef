"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ChatIdContextType = {
  chatId: string | null;
  setChatId: (id: string) => void;
};

const ChatIdContext = createContext<ChatIdContextType | undefined>(undefined);

export const ChatIdProvider = ({ children }: { children: ReactNode }) => {
  const [chatId, setChatId] = useState<string | null>(null);

  return (
    <ChatIdContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatIdContext.Provider>
  );
};

// Custom Hook
export const useChatId = (): ChatIdContextType => {
  const context = useContext(ChatIdContext);
  if (!context) {
    throw new Error('useChatId must be used within a ChatIdProvider');
  }
  return context;
};