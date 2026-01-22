import type { FC } from "react";
import type { Chat } from "@/entities/chat";
import $styles from "./ChatList.module.css";
import { useAuth } from "@/features/auth";
import ChatListItem from "./ui/ChatListItem/ChatListItem";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (id: string) => void;
}

const ChatList: FC<ChatListProps> = ({ chats, onSelectChat }) => {
  const { user } = useAuth();

  return (
    <div className={$styles.ChatList}>
      {chats.length ? (
        <ul className={$styles.list}>
          {chats.map((chat) => (
            <li className={$styles.list__item} key={chat.id}>
              <ChatListItem
                chat={chat}
                onSelectChat={onSelectChat}
                user={user!}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found</p>
      )}
    </div>
  );
};

export default ChatList;
