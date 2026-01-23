export { default as Chat } from "./ui/Chat/Chat";
export { default as ChatList } from "./ui/ChatList/ChatList";

export {
  useGetUserChats,
  useLoadMessages,
  useLazyLoadMessages,
  useSearchUsers,
  useCreateChat,
  useSendMessage,
} from "./api/hooks";

export {
  useGetChatsQuery,
  useLazyGetChatsQuery,
  useLoadMessagesQuery,
  useLazyLoadMessagesQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useCreateChatMutation,
  useSendMessageMutation,
} from "@/shared/api/generated/enhanced-api";

export type { Chat as ChatType, Message } from "./model/types";
