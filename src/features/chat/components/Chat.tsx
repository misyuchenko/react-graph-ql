import { useEffect, type FC } from "react";
import $styles from "./Chat.module.css";
import { useLazyLoadMessages, useSendMessage } from "@/service/chat.hooks";
import type { Chat as ChatType } from "@/service/chat.service";
import MessageInput from "./MessageInput";
interface Props {
  chat?: ChatType;
}

const Chat: FC<Props> = ({ chat }) => {
  const { loadMessages, messages, loading, error } = useLazyLoadMessages();

  const { sendMessage } = useSendMessage();

  useEffect(() => {
    if (chat?.id) {
      loadMessages(chat.id);
    }
  }, [chat?.id, loadMessages]);

  const handleSendMessage = (text: string) => {
    if (!chat) return;
    sendMessage(chat.id, text);
  };

  return (
    <div className={$styles.Chat}>
      <h1>
        {chat
          ? `Chat with ${chat.participants[0].username}`
          : "No chat selected."}
      </h1>
      {loading && <p>Loading messages...</p>}
      {error && <p className={$styles.Chat__error}>Error: {error.message}</p>}
      {messages.length > 0 && (
        <ul className={$styles.Chat__messagesList}>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.sender.username}:</strong> {msg.text}
            </li>
          ))}
        </ul>
      )}
      {chat && <MessageInput onSendMessage={handleSendMessage} />}
    </div>
  );
};

export default Chat;
