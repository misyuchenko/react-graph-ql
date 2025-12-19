import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import {
  GET_USER_CHATS_QUERY,
  LOAD_MESSAGES_QUERY,
  SEARCH_USERS_QUERY,
  CREATE_CHAT_MUTATION,
  SEND_MESSAGE_MUTATION,
} from "./queries";

export function useGetUserChats() {
  const { data, loading, error, refetch } = useQuery(GET_USER_CHATS_QUERY);

  return {
    chats: data?.getChats || [],
    loading,
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
  const { data, loading, error, fetchMore, refetch } = useQuery(
    LOAD_MESSAGES_QUERY,
    {
      variables: {
        chatId,
        cursor: options?.cursor,
      },
      skip: !chatId,
    },
  );

  const loadMoreMessages = (cursor: string) => {
    return fetchMore({
      variables: {
        chatId,
        cursor,
      },
    });
  };

  return {
    messages: data?.loadMessages || [],
    loading,
    error,
    loadMoreMessages,
    refetch,
  };
}

export function useLazyLoadMessages() {
  const [loadMessages, { data, loading, error, fetchMore }] =
    useLazyQuery(LOAD_MESSAGES_QUERY);

  const load = (
    chatId: string,
    options?: {
      cursor?: string;
    },
  ) => {
    return loadMessages({
      variables: {
        chatId,
        cursor: options?.cursor,
      },
    });
  };

  const loadMore = (chatId: string, cursor: string) => {
    return fetchMore({
      variables: {
        chatId,
        cursor,
      },
    });
  };

  return {
    loadMessages: load,
    messages: data?.loadMessages || [],
    loading,
    error,
    loadMore,
  };
}

export function useSearchUsers() {
  const [searchUsers, { data, loading, error }] =
    useLazyQuery(SEARCH_USERS_QUERY);

  return {
    searchUsers: (username: string) => searchUsers({ variables: { username } }),
    users: data?.searchUsers || [],
    loading,
    error,
  };
}

export function useCreateChat() {
  const [createChat, { data, loading, error }] = useMutation(
    CREATE_CHAT_MUTATION,
    {
      refetchQueries: ["GetUserChats"],
    },
  );

  return {
    createChat: (username: string) => createChat({ variables: { username } }),
    chat: data?.createChat,
    loading,
    error,
  };
}
export function useSendMessage() {
  const [sendMessage, { data, loading, error, reset }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      refetchQueries: ["LoadMessages"],
    },
  );

  return {
    sendMessage: (chatId: string, text: string) =>
      sendMessage({ variables: { chatId, text } }),
    message: data?.sendMessage,
    loading,
    error,
    reset,
  };
}
