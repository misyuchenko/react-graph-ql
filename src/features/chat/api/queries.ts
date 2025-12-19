import { gql } from "@apollo/client";



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
