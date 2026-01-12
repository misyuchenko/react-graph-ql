// UI Components
export { default as Chat } from "./ui/Chat";
export { default as ChatList } from "./ui/ChatList";

// Hooks
export {
  useGetUserChats,
  useLoadMessages,
  useLazyLoadMessages,
  useSearchUsers,
  useCreateChat,
  useSendMessage,
} from "./api/hooks";

// RTK Query hooks
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

// Types
export type { Chat as ChatType, Message } from "./model/types";
