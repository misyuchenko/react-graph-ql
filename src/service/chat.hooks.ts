import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import {
  queries,
  mutations,
  type GetUserChatsResponse,
  type LoadMessagesResponse,
  type LoadMessagesInput,
  type SearchUsersResponse,
  type CreateChatResponse,
  type CreateChatInput,
  type SendMessageResponse,
  type SendMessageInput,
} from "./chat.service";

export function useGetUserChats() {
  const { data, loading, error, refetch } = useQuery<GetUserChatsResponse>(
    queries.getUserChats,
  );

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
  const { data, loading, error, fetchMore, refetch } = useQuery<
    LoadMessagesResponse,
    LoadMessagesInput
  >(queries.loadMessages, {
    variables: {
      chatId,
      cursor: options?.cursor,
    },
    skip: !chatId,
  });

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
  const [loadMessages, { data, loading, error, fetchMore }] = useLazyQuery<
    LoadMessagesResponse,
    LoadMessagesInput
  >(queries.loadMessages);

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
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersResponse,
    { username: string }
  >(queries.searchUsers);

  return {
    searchUsers: (username: string) => searchUsers({ variables: { username } }),
    users: data?.searchUsers || [],
    loading,
    error,
  };
}

export function useCreateChat() {
  const [createChat, { data, loading, error }] = useMutation<
    CreateChatResponse,
    CreateChatInput
  >(mutations.createChat, {
    refetchQueries: ["GetUserChats"],
  });

  return {
    createChat: (username: string) => createChat({ variables: { username } }),
    chat: data?.createChat,
    loading,
    error,
  };
}
export function useSendMessage() {
  const [sendMessage, { data, loading, error, reset }] = useMutation<
    SendMessageResponse,
    SendMessageInput
  >(mutations.sendMessage, {
    refetchQueries: ["LoadMessages"],
  });

  return {
    sendMessage: (chatId: string, text: string) =>
      sendMessage({ variables: { chatId, text } }),
    message: data?.sendMessage,
    loading,
    error,
    reset,
  };
}
