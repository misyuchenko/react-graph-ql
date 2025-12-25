import { rtkQueryApi } from "@/shared/api/rtkQuery";
import type {
  GetUserChatsResponse,
  LoadMessagesResponse,
  LoadMessagesInput,
  SearchUsersResponse,
  CreateChatResponse,
  SendMessageResponse,
  SendMessageInput,
  Chat,
  Message,
} from "../model/types";

const GET_USER_CHATS_QUERY = `
  query GetUserChats {
    getChats {
      id
      title
      createdAt
      participants {
        username
      }
    }
  }
`;

const LOAD_MESSAGES_QUERY = `
  query LoadMessages($chatId: ID!, $cursor: ID) {
    loadMessages(chatId: $chatId, cursor: $cursor) {
      id
      chatId
      sender {
        username
      }
      text
      createdAt
    }
  }
`;

const SEARCH_USERS_QUERY = `
  query SearchUsers($username: String!) {
    searchUsers(username: $username) {
      username
    }
  }
`;

const CREATE_CHAT_MUTATION = `
  mutation CreateChat($username: String!) {
    createChat(input: { username: $username }) {
      id
      title
      createdAt
      participants {
        username
      }
    }
  }
`;

const SEND_MESSAGE_MUTATION = `
  mutation SendMessage($chatId: ID!, $text: String!) {
    sendMessage(input: { chatId: $chatId, text: $text }) {
      id
      chatId
      text
      createdAt
      sender {
        username
      }
    }
  }
`;

export const chatApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query<Chat[], void>({
      query: () => ({
        document: GET_USER_CHATS_QUERY,
      }),
      transformResponse: (response: GetUserChatsResponse) => response.getChats,
      providesTags: ["UserChats"],
    }),

    loadMessages: builder.query<Message[], LoadMessagesInput>({
      query: (variables) => ({
        document: LOAD_MESSAGES_QUERY,
        variables,
      }),
      transformResponse: (response: LoadMessagesResponse) => response.loadMessages,
      providesTags: (_result, _error, { chatId }) => [
        { type: "Messages", id: chatId },
      ],
    }),

    searchUsers: builder.query<{ username: string }[], string>({
      query: (username) => ({
        document: SEARCH_USERS_QUERY,
        variables: { username },
      }),
      transformResponse: (response: SearchUsersResponse) => response.searchUsers,
      providesTags: ["Users"],
    }),

    createChat: builder.mutation<Chat, string>({
      query: (username) => ({
        document: CREATE_CHAT_MUTATION,
        variables: { username },
      }),
      transformResponse: (response: CreateChatResponse) => response.createChat,
      invalidatesTags: ["UserChats"],
    }),

    sendMessage: builder.mutation<Message, SendMessageInput>({
      query: (variables) => ({
        document: SEND_MESSAGE_MUTATION,
        variables,
      }),
      transformResponse: (response: SendMessageResponse) => response.sendMessage,
      async onQueryStarted({ chatId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newMessage } = await queryFulfilled;
          dispatch(
            chatApi.util.updateQueryData(
              "loadMessages",
              { chatId },
              (draft) => {
                draft.push(newMessage);
              }
            )
          );
        } catch {
          // Ignore error
        }
      },
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useLazyGetUserChatsQuery,
  useLoadMessagesQuery,
  useLazyLoadMessagesQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useCreateChatMutation,
  useSendMessageMutation,
} = chatApi;
