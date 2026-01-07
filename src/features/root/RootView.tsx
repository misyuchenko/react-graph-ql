import { useEffect, useMemo, useState, type FC } from "react";
import ChatList from "../chat-list/ChatList";
import Header from "./components/header/Header";
import Chat from "../chat/components/Chat";
import { useQuery } from "@apollo/client/react";
import { queries, type GetUserChatsResponse } from "@/service/chat.service";

const RootView: FC = () => {
  const [currentChatId, setCurrentChatId] = useState("");

  const { data, error } = useQuery<GetUserChatsResponse>(queries.getUserChats);

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
  };

  useEffect(() => {
    if (error) {
      console.error("Error fetching user chats:", error);
    }
  }, [error]);

  const chats = useMemo(() => {
    return data?.getChats || [];
  }, [data]);

  const currentChat = useMemo(() => {
    return chats.find((chat) => chat.id === currentChatId);
  }, [chats, currentChatId]);

  return (
    <>
      <Header />
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      <Chat chat={currentChat} />
    </>
  );
};

export default RootView;
