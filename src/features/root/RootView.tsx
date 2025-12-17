import { useEffect, useState, type FC } from "react";
import SearchUser from "./components/search-user/SearchUser";
import $style from "./RootView.module.css";
import { chatService } from "@/service/chat.service";
import ChatList from "../chat-list/ChatList";
import Header from "./components/header/Header";
import Chat from "../chat/components/Chat";
const RootView: FC = () => {
  const [chats, setChats] = useState<string[]>([]);

  const getUserChats = async () => {
    try {
      const { geChats } = await chatService.getUserChats();
      setChats(geChats);
    } catch (error) {
      console.error("Failed to fetch user chats:", error);
    }
  };

  useEffect(() => {
    getUserChats();
  }, []);

  return (
    <>
      <Header />
      <ChatList chats={chats} />
      <Chat />
    </>
  );
};

export default RootView;
