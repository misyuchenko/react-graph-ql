import type { FC } from "react";
import $styles from "./ChatList.module.css";

interface ChatListProps {
  chats?: string[];
}

const ChatList: FC<ChatListProps> = ({ chats }) => {
  return (
    <div className={$styles.ChatList}>
      {chats?.length ? (
        <ul>
          {chats.map((chatId) => (
            <li key={chatId}>{chatId}</li>
          ))}
        </ul>
      ) : (
        <p>No chats found</p>
      )}
    </div>
  );
};

export default ChatList;
