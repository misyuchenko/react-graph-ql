import { rtkQueryApi } from "@/shared/api/rtkQuery";
import type {
  GetChatsQuery,
  LoadMessagesQuery,
  SearchUsersQuery,
  WhoAmIQuery,
  CreateChatMutation,
  SendMessageMutation,
  SignInMutation,
  SignUpMutation,
  MarkChatReadMutation,
  LoadMessagesQueryVariables,
  SearchUsersQueryVariables,
  CreateChatMutationVariables,
  SendMessageMutationVariables,
  SignInMutationVariables,
  SignUpMutationVariables,
  MarkChatReadMutationVariables,
} from "./graphql";
import {
  SayHelloDocument,
  WhoAmIDocument,
  SearchUsersDocument,
  GetChatsDocument,
  LoadMessagesDocument,
  SignUpDocument,
  SignInDocument,
  CreateChatDocument,
  SendMessageDocument,
  MarkChatReadDocument,
} from "./graphql-rtk";

export type User = { username: string };
export type Chat = GetChatsQuery["getChats"][number];
export type Message = LoadMessagesQuery["loadMessages"][number];

const enhancedApi = rtkQueryApi
  .enhanceEndpoints({
    addTagTypes: ["Auth", "UserChats", "Messages", "Users"],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      SayHello: build.query<string, void>({
        query: () => ({ document: SayHelloDocument }),
        transformResponse: (response: { sayHello: string }) => response.sayHello,
      }),
      WhoAmI: build.query<User, void>({
        query: () => ({ document: WhoAmIDocument }),
        transformResponse: (response: WhoAmIQuery) => response.whoAmI,
        providesTags: ["Auth"],
      }),
      GetChats: build.query<Chat[], void>({
        query: () => ({ document: GetChatsDocument }),
        transformResponse: (response: GetChatsQuery) => response.getChats,
        providesTags: ["UserChats"],
      }),
      LoadMessages: build.query<Message[], LoadMessagesQueryVariables>({
        query: (variables) => ({ document: LoadMessagesDocument, variables }),
        transformResponse: (response: LoadMessagesQuery) => response.loadMessages,
        providesTags: (_result, _error, { chatId }) => [
          { type: "Messages", id: chatId },
        ],
      }),
      SearchUsers: build.query<User[], SearchUsersQueryVariables>({
        query: (variables) => ({ document: SearchUsersDocument, variables }),
        transformResponse: (response: SearchUsersQuery) => response.searchUsers,
        providesTags: ["Users"],
      }),
      SignIn: build.mutation<SignInMutation, SignInMutationVariables>({
        query: (variables) => ({ document: SignInDocument, variables }),
        invalidatesTags: ["Auth"],
      }),
      SignUp: build.mutation<SignUpMutation, SignUpMutationVariables>({
        query: (variables) => ({ document: SignUpDocument, variables }),
      }),
      CreateChat: build.mutation<Chat, CreateChatMutationVariables>({
        query: (variables) => ({ document: CreateChatDocument, variables }),
        transformResponse: (response: CreateChatMutation) => response.createChat,
        invalidatesTags: ["UserChats"],
      }),
      SendMessage: build.mutation<Message, SendMessageMutationVariables>({
        query: (variables) => ({ document: SendMessageDocument, variables }),
        transformResponse: (response: SendMessageMutation) => response.sendMessage,
        async onQueryStarted({ input }, { dispatch, queryFulfilled }) {
          try {
            const { data: newMessage } = await queryFulfilled;
            dispatch(
              enhancedApi.util.updateQueryData(
                "LoadMessages",
                { chatId: input.chatId },
                (draft) => {
                  draft.push(newMessage);
                },
              ),
            );
          } catch {
            // Ignore error
          }
        },
      }),
      MarkChatRead: build.mutation<boolean, MarkChatReadMutationVariables>({
        query: (variables) => ({ document: MarkChatReadDocument, variables }),
        transformResponse: (response: MarkChatReadMutation) => response.markChatRead,
      }),
    }),
  });

export { enhancedApi as api };

export const {
  useSayHelloQuery,
  useLazySayHelloQuery,
  useWhoAmIQuery,
  useLazyWhoAmIQuery,
  useGetChatsQuery,
  useLazyGetChatsQuery,
  useLoadMessagesQuery,
  useLazyLoadMessagesQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useSignInMutation,
  useSignUpMutation,
  useCreateChatMutation,
  useSendMessageMutation,
  useMarkChatReadMutation,
} = enhancedApi;
