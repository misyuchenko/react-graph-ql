import { useEffect, useMemo, useState, type FC } from "react";
import { Chat, ChatList, useGetUserChats } from "@/features/chat";
import { useBreakpoints } from "@/shared/hooks";

const RootPage: FC = () => {
  const [currentChatId, setCurrentChatId] = useState("");
  const { chats: allChats, error } = useGetUserChats();

  const { isDesktop } = useBreakpoints();

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
      {isDesktop && (
        <ChatList chats={allChats} onSelectChat={handleSelectChat} />
      )}
      <Chat chat={currentChat} />
    </>
  );
};

export default RootPage;
