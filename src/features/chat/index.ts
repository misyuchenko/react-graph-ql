export { default as Chat } from "./ui/Chat";
export { default as ChatList } from "./ui/ChatList";

export {
  useGetUserChats,
  useLoadMessages,
  useLazyLoadMessages,
  useSearchUsers,
  useCreateChat,
  useSendMessage,
} from "./api/hooks";

export {
  useGetUserChatsQuery,
  useLazyGetUserChatsQuery,
  useLoadMessagesQuery,
  useLazyLoadMessagesQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useCreateChatMutation,
  useSendMessageMutation,
} from "./api/chatApi";

export type { Chat as ChatType, Message } from "./model/types";
