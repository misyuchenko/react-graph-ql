import type { Chat } from "@/entities";
import type { User } from "@/entities";
import styles from "./ChatListItem.module.scss";

interface Props {
  chat: Chat;
  user: User;
  onSelectChat: (id: string) => void;
}

const ChatListItem: React.FC<Props> = ({ chat, onSelectChat, user }) => {
  return (
    <article className={styles.chatListItem}>
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
