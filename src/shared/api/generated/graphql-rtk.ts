import * as Types from "./graphql";

import { rtkQueryApi } from "@/shared/api/rtkQuery";

export const SayHelloDocument = `
    query SayHello {
  sayHello
}
    `;
export const WhoAmIDocument = `
    query WhoAmI {
  whoAmI {
    username
  }
}
    `;
export const SearchUsersDocument = `
    query SearchUsers($username: String!) {
  searchUsers(username: $username) {
    username
  }
}
    `;
export const GetChatsDocument = `
    query GetChats {
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
export const LoadMessagesDocument = `
    query LoadMessages($chatId: ID!, $cursor: ID, $direction: MessageDirection) {
  loadMessages(chatId: $chatId, cursor: $cursor, direction: $direction) {
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
export const SignUpDocument = `
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    accessToken
  }
}
    `;
export const SignInDocument = `
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    accessToken
  }
}
    `;
export const CreateChatDocument = `
    mutation CreateChat($input: CreateChatInput!) {
  createChat(input: $input) {
    id
    title
    createdAt
    participants {
      username
    }
  }
}
    `;
export const SendMessageDocument = `
    mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input) {
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
export const MarkChatReadDocument = `
    mutation MarkChatRead($input: MarkReadInput!) {
  markChatRead(input: $input)
}
    `;

const injectedRtkApi = rtkQueryApi.injectEndpoints({
  endpoints: (build) => ({
    SayHello: build.query<
      Types.SayHelloQuery,
      Types.SayHelloQueryVariables | void
    >({
      query: (variables) => ({ document: SayHelloDocument, variables }),
    }),
    WhoAmI: build.query<Types.WhoAmIQuery, Types.WhoAmIQueryVariables | void>({
      query: (variables) => ({ document: WhoAmIDocument, variables }),
    }),
    SearchUsers: build.query<
      Types.SearchUsersQuery,
      Types.SearchUsersQueryVariables
    >({
      query: (variables) => ({ document: SearchUsersDocument, variables }),
    }),
    GetChats: build.query<
      Types.GetChatsQuery,
      Types.GetChatsQueryVariables | void
    >({
      query: (variables) => ({ document: GetChatsDocument, variables }),
    }),
    LoadMessages: build.query<
      Types.LoadMessagesQuery,
      Types.LoadMessagesQueryVariables
    >({
      query: (variables) => ({ document: LoadMessagesDocument, variables }),
    }),
    SignUp: build.mutation<Types.SignUpMutation, Types.SignUpMutationVariables>(
      {
        query: (variables) => ({ document: SignUpDocument, variables }),
      },
    ),
    SignIn: build.mutation<Types.SignInMutation, Types.SignInMutationVariables>(
      {
        query: (variables) => ({ document: SignInDocument, variables }),
      },
    ),
    CreateChat: build.mutation<
      Types.CreateChatMutation,
      Types.CreateChatMutationVariables
    >({
      query: (variables) => ({ document: CreateChatDocument, variables }),
    }),
    SendMessage: build.mutation<
      Types.SendMessageMutation,
      Types.SendMessageMutationVariables
    >({
      query: (variables) => ({ document: SendMessageDocument, variables }),
    }),
    MarkChatRead: build.mutation<
      Types.MarkChatReadMutation,
      Types.MarkChatReadMutationVariables
    >({
      query: (variables) => ({ document: MarkChatReadDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const {
  useSayHelloQuery,
  useLazySayHelloQuery,
  useWhoAmIQuery,
  useLazyWhoAmIQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useGetChatsQuery,
  useLazyGetChatsQuery,
  useLoadMessagesQuery,
  useLazyLoadMessagesQuery,
  useSignUpMutation,
  useSignInMutation,
  useCreateChatMutation,
  useSendMessageMutation,
  useMarkChatReadMutation,
} = injectedRtkApi;
