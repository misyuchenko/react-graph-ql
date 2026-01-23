import {
  useGetChatsQuery,
  useLoadMessagesQuery,
  useLazyLoadMessagesQuery,
  useLazySearchUsersQuery,
  useCreateChatMutation,
  useSendMessageMutation,
} from "@/shared/api/generated/enhanced-api";

export function useGetUserChats() {
  const { data, isLoading, error, refetch } = useGetChatsQuery();

  return {
    chats: data || [],
    loading: isLoading,
    error,
    refetch,
  };
}

export function useLoadMessages(
  chatId: string,
  options?: {
    cursor?: string;
  },
) {
  const { data, isLoading, error, refetch } = useLoadMessagesQuery(
    {
      chatId,
      cursor: options?.cursor,
    },
    {
      skip: !chatId,
    }
  );

  const loadMoreMessages = () => {
    return refetch();
  };

  return {
    messages: data || [],
    loading: isLoading,
    error,
    loadMoreMessages,
    refetch,
  };
}

export function useLazyLoadMessages() {
  const [trigger, { data, isLoading, error }] = useLazyLoadMessagesQuery();

  const load = (
    chatId: string,
    options?: {
      cursor?: string;
    },
  ) => {
    return trigger({
      chatId,
      cursor: options?.cursor,
    });
  };

  const loadMore = (chatId: string, cursor: string) => {
    return trigger({ chatId, cursor });
  };

  return {
    loadMessages: load,
    messages: data || [],
    loading: isLoading,
    error,
    loadMore,
  };
}

export function useSearchUsers() {
  const [trigger, { data, isLoading, error }] = useLazySearchUsersQuery();

  return {
    searchUsers: (username: string) => trigger({ username }),
    users: data || [],
    loading: isLoading,
    error,
  };
}

export function useCreateChat() {
  const [createChatMutation, { data, isLoading, error }] = useCreateChatMutation();

  return {
    createChat: (username: string) => createChatMutation({ input: { username } }),
    chat: data,
    loading: isLoading,
    error,
  };
}

export function useSendMessage() {
  const [sendMessageMutation, { data, isLoading, error, reset }] = useSendMessageMutation();

  return {
    sendMessage: (chatId: string, text: string) =>
      sendMessageMutation({ input: { chatId, text } }),
    message: data,
    loading: isLoading,
    error,
    reset,
  };
}
