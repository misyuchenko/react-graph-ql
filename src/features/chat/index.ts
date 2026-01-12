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

// Queries & Mutations
export {
  GET_USER_CHATS_QUERY,
  LOAD_MESSAGES_QUERY,
  SEARCH_USERS_QUERY,
  CREATE_CHAT_MUTATION,
  SEND_MESSAGE_MUTATION,
} from "./api/queries";

// Types
export type { Chat as ChatType, Message } from "./model/types";
