import { useEffect, useState, type FC } from "react";
import $styles from "./Chat.module.css";
import { useLazyLoadMessages, useSendMessage } from "../api/hooks";
import type { Chat as ChatType, Message } from "../model/types";
import MessageInput from "./MessageInput";
import { useSocket } from "@/shared/hooks/useSocket";
import { joinChat, leaveChat, onNewMessage, offNewMessage } from "@/app/socket";

interface Props {
  chat?: ChatType;
}

const Chat: FC<Props> = ({ chat }) => {
  const {
    loadMessages,
    messages: initialMessages,
    loading,
    error,
  } = useLazyLoadMessages();
  const { sendMessage } = useSendMessage();
  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);

  // Подключаемся к WebSocket
  useSocket();

  // Объединяем исторические сообщения и сообщения в реальном времени
  const messages = [...initialMessages, ...realtimeMessages];

  // Загружаем историю сообщений и подключаемся к чату через WebSocket
  useEffect(() => {
    if (!chat?.id) {
      setRealtimeMessages([]);
      return;
    }

    // Загружаем исторические сообщения через GraphQL
    loadMessages(chat.id);

    // Присоединяемся к чату через WebSocket
    joinChat(chat.id);
    console.log(chat.id);

    // Обработчик новых сообщений в реальном времени
    const handleNewMessage = (message: Message) => {
      // Добавляем только сообщения текущего чата
      if (message.chatId === chat.id) {
        setRealtimeMessages((prev) => {
          // Проверяем, не дублируется ли сообщение
          const isDuplicate = prev.some((msg) => msg.id === message.id);
          if (isDuplicate) return prev;
          return [...prev, message];
        });
      }
    };

    // Подписываемся на новые сообщения
    onNewMessage(handleNewMessage);

    // Очистка при смене чата или размонтировании
    return () => {
      offNewMessage(handleNewMessage);
      leaveChat(chat.id);
      setRealtimeMessages([]);
    };
  }, [chat?.id, loadMessages]);

  const handleSendMessage = async (text: string) => {
    if (!chat) return;

    try {
      // Отправляем сообщение через GraphQL
      const result = await sendMessage(chat.id, text);

      // Добавляем отправленное сообщение в список, если оно вернулось из mutation
      if (result.data?.sendMessage) {
        const newMessage = result.data.sendMessage;

        // Добавляем в realtimeMessages если его еще нет
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

  return (
    <div className={$styles.Chat}>
      <h1>
        {chat
          ? `Chat with ${chat.participants[0].username}`
          : "No chat selected."}
      </h1>
      {realtimeMessages.length === 0 &&
        initialMessages.length === 0 &&
        !loading && <p>No messages yet. Start the conversation!</p>}
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
