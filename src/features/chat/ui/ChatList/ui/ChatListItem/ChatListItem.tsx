import type { Chat } from "@/entities/chat";
import type { User } from "@/entities/user";
import style from "./ChatListItem.module.css";

interface Props {
  chat: Chat;
  user: User;
  onSelectChat: (id: string) => void;
}

const ChatListItem: React.FC<Props> = ({ chat, onSelectChat, user }) => {
  return (
    <article className={style.ChatListItem}>
      {chat.title && <strong>{chat.title}</strong>}
      <p onClick={() => onSelectChat(chat.id)}>
        {chat.participants
          .map((p) => p.username)
          .filter((p) => p !== user?.username)
          .join(", ")}
      </p>
    </article>
  );
};

export default ChatListItem;
