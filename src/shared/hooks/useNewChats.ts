import { useEffect, useState, useCallback } from "react";
import { onNewChat, offNewChat } from "@/app/socket";
import type { ChatSummary } from "@/app/socket/types";

export const useNewChats = () => {
  const [newChats, setNewChats] = useState<ChatSummary[]>([]);

  const handleNewChat = useCallback((chat: ChatSummary) => {
    setNewChats((prev) => [...prev, chat]);
  }, []);

  useEffect(() => {
    onNewChat(handleNewChat);

    return () => {
      offNewChat(handleNewChat);
    };
  }, [handleNewChat]);

  const clearNewChats = useCallback(() => {
    setNewChats([]);
  }, []);

  return {
    newChats,
    clearNewChats,
  };
};
