import { gql } from "@apollo/client";

export interface LoadMessagesInput {
  chatId: string;
  cursor?: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: {
    username: string;
  };
  text: string;
  createdAt: string;
}

export interface LoadMessagesResponse {
  loadMessages: Message[];
}

export interface SearchUsersResponse {
  searchUsers: {
    username: string;
  }[];
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  participants: {
    username: string;
  }[];
}

export interface GetUserChatsResponse {
  getChats: Chat[];
}

export interface CreateChatInput {
  username: string;
}

export interface CreateChatResponse {
  createChat: Chat;
}

export interface SendMessageInput {
  chatId: string;
  text: string;
}

export interface SendMessageResponse {
  sendMessage: Message;
}

export const queries = {
  loadMessages: gql`
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
  `,
  searchUsers: gql`
    query SearchUsers($username: String!) {
      searchUsers(username: $username) {
        username
      }
    }
  `,
  getUserChats: gql`
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
  `,
};

export const mutations = {
  createChat: gql`
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
  `,
  sendMessage: gql`
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
  `,
};
