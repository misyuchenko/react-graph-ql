import type { FC } from "react";
import $styles from "./ChatList.module.css";
import type { Chat } from "../model/types";

interface ChatListProps {
  chats?: Chat[];
  onSelectChat: (id: string) => void;
}

const ChatList: FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className={$styles.ChatList}>
      {chats?.length ? (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <div>
                {chat.title && <strong>{chat.title}</strong>}
                <p onClick={() => onSelectChat(chat.id)}>
                  Participants:{" "}
                  {chat.participants.map((p) => p.username).join(", ")}
                </p>
              </div>
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
