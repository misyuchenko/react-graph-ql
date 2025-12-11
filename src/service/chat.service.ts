import client from "@/apolloClient";
import { gql } from "@apollo/client";

interface loadMessagesInput {
  chatId: string;
  cursor?: string;
  direction?: "ASC" | "DESC";
}

interface loadMessagesResponse {
  loadMessages: {
    id: string;
    chatId: string;
    sender: {
      username: string;
    };
    text: string;
    createdAt: string;
  }[];
}

interface searchUsersResponse {
  searchUsers: {
    username: string;
  }[];
}

const mutations = {};
const queries = {
  loadMessages: gql`
    query LoadMessages {
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
  `,
  searchUsers: gql`
    query SearchUsers($username: String!) {
      searchUsers(username: $username) {
        username
      }
    }
  `,
};

export const chatService = {
  loadMessages: async (
    input: loadMessagesInput,
  ): Promise<loadMessagesResponse> => {
    try {
      const { data } = await client.query<loadMessagesResponse>({
        query: queries.loadMessages,
        variables: input,
      });

      if (!data) {
        throw new Error("No data returned from loadMessages query");
      }

      return data;
    } catch (error) {
      console.error("loadMessages error:", error);
      throw error;
    }
  },
  searchUsers: async (
    searchTerm: string,
  ): Promise<searchUsersResponse> => {
    try {
      const { data } = await client.query<searchUsersResponse>({
        query: queries.searchUsers,
        variables: { username: searchTerm },
      });

      if (!data) {
        throw new Error("No data returned from searchUsers query");
      }

      return data;
    } catch (error) {
      console.error("searchUsers error:", error);
      throw error;
    }
  },
};
