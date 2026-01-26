import { joinChat, leaveChat, offNewMessage, onNewMessage } from "@/app/socket";
import { useSocket } from "@/shared/hooks/useSocket";
import { useEffect, useMemo, useState, type FC } from "react";
import { useLazyLoadMessages, useSendMessage } from "../../api/hooks";
import type { Chat as ChatType, Message } from "../../model/types";
import styles from "./Chat.module.scss";
import { useAuth } from "@/features/auth";
import ChatMessageInput from "../ChatMessageInput/ChatMessageInput";
import { cn } from "@/shared/utils";
import ChatHeader from "../ChatHeader/ChatHeader";
interface Props {
  chat?: ChatType;
}

const Chat: FC<Props> = ({ chat }) => {
  const { user } = useAuth();
  const {
    loadMessages,
    messages: initialMessages,
    loading,
    error,
  } = useLazyLoadMessages();
  const { sendMessage } = useSendMessage();
  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);

  useSocket();

  const messages = [...initialMessages, ...realtimeMessages];

  useEffect(() => {
    if (!chat?.id) {
      setRealtimeMessages([]);
      return;
    }

    loadMessages(chat.id);

    joinChat(chat.id);
    console.log(chat.id);

    const handleNewMessage = (message: Message) => {
      if (message.chatId === chat.id) {
        setRealtimeMessages((prev) => {
          const isDuplicate = prev.some((msg) => msg.id === message.id);
          if (isDuplicate) return prev;
          return [...prev, message];
        });
      }
    };

    onNewMessage(handleNewMessage);

    return () => {
      offNewMessage(handleNewMessage);
      leaveChat(chat.id);
      setRealtimeMessages([]);
    };
  }, [chat?.id, loadMessages]);

  const handleSendMessage = async (text: string) => {
    if (!chat) return;

    try {
      const result = await sendMessage(chat.id, text);

      if (result.data) {
        const newMessage = result.data;

        setRealtimeMessages((prev) => {
          const isDuplicate =
            prev.some((msg) => msg.id === newMessage.id) ||
            initialMessages.some((msg) => msg.id === newMessage.id);

          if (isDuplicate) return prev;
          return [...prev, newMessage];
        });
      }
    } catch (err) {
      console.error("[Chat] Failed to send message:", err);
    }
  };

  const sortedMessages = useMemo(() => {
    return messages.map((msg) => ({
      ...msg,
      isOwn: msg.sender.username === user?.username,
    }));
  }, [messages, user, chat]);

  const chatWith = useMemo(() => {
    if (!chat) return "";

    return chat.participants
      .filter((p) => p.username !== user?.username)
      .map((p) => p.username)
      .join(", ");
  }, [chat, user]);

  return (
    <div className={styles.Chat}>
      <ChatHeader chatWith={chatWith} />

      {realtimeMessages.length === 0 &&
        initialMessages.length === 0 &&
        !loading && <p>No messages yet. Start the conversation!</p>}
      {loading && <p>Loading messages...</p>}
      {error && <p className={styles.Chat__error}>Error: {error.message}</p>}
      {sortedMessages.length > 0 && (
        <ul className={styles.Chat__messagesList}>
          {sortedMessages.map((msg) => (
            <li
              key={msg.id}
              className={cn(styles.message, { [styles.isOwn]: msg.isOwn })}
            >
              {!msg.isOwn && <strong>{msg.sender.username}:</strong>}

              {msg.text}
            </li>
          ))}
        </ul>
      )}
      {chat && <ChatMessageInput onSendMessage={handleSendMessage} />}
    </div>
  );
};

export default Chat;
