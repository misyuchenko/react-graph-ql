import { useEffect, useMemo, useState, type FC } from "react";
import { Chat, ChatList, useGetUserChats } from "@/features/chat";
import Header from "./components/header/Header";

const RootView: FC = () => {
  const [currentChatId, setCurrentChatId] = useState("");

  const { chats: allChats, error } = useGetUserChats();

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
  };

  useEffect(() => {
    if (error) {
      console.error("Error fetching user chats:", error);
    }
  }, [error]);

  const currentChat = useMemo(() => {
    return allChats.find((chat) => chat.id === currentChatId);
  }, [allChats, currentChatId]);

  return (
    <>
      <Header />
      <ChatList chats={allChats} onSelectChat={handleSelectChat} />
      <Chat chat={currentChat} />
    </>
  );
};

export default RootView;
