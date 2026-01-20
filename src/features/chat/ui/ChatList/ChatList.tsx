import type { FC } from "react";
import type { Chat } from "../../model/types";
import $styles from "./ChatList.module.css";
import { useAuth } from "@/features/auth";

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
              <div>
                {chat.title && <strong>{chat.title}</strong>}
                <p onClick={() => onSelectChat(chat.id)}>
                  {chat.participants
                    .map((p) => p.username)
                    .filter((p) => p !== user?.username)
                    .join(", ")}
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
