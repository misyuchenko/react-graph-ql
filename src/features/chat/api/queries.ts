import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  LoadMessagesResponse,
  LoadMessagesInput,
  SearchUsersResponse,
  GetUserChatsResponse,
  CreateChatResponse,
  CreateChatInput,
  SendMessageResponse,
  SendMessageInput,
} from "../model/types";

export const LOAD_MESSAGES_QUERY: TypedDocumentNode<
  LoadMessagesResponse,
  LoadMessagesInput
> = gql`
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

export const SEARCH_USERS_QUERY: TypedDocumentNode<
  SearchUsersResponse,
  { username: string }
> = gql`
  query SearchUsers($username: String!) {
    searchUsers(username: $username) {
      username
    }
  }
`;

export const GET_USER_CHATS_QUERY: TypedDocumentNode<GetUserChatsResponse> = gql`
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

export const CREATE_CHAT_MUTATION: TypedDocumentNode<
  CreateChatResponse,
  CreateChatInput
> = gql`
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

export const SEND_MESSAGE_MUTATION: TypedDocumentNode<
  SendMessageResponse,
  SendMessageInput
> = gql`
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
