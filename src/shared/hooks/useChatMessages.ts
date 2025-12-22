import { useEffect, useState, useCallback } from "react";
import { joinChat, leaveChat, onNewMessage, offNewMessage } from "@/app/socket";
import type { Message } from "@/app/socket/types";

export const useChatMessages = (channelId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    if (!channelId) return;

    joinChat(channelId);

    onNewMessage(handleNewMessage);

    return () => {
      offNewMessage(handleNewMessage);

      leaveChat(channelId);
    };
  }, [channelId, handleNewMessage]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    addMessage,
    clearMessages,
  };
};
