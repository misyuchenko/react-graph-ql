import client from "@/apolloClient";
import { gql } from "@apollo/client";

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  signIn: {
    accessToken: string;
  };
}

const LOGIN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

const HOW_AM_I = gql`
  query WhoAmI {
      whoAmI {
          username
      }
  }
`;

export const authService = {
  hoAmI : async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const { data } = await client.query({
        query: gql`
          query Me {
            me {
              id
              email
              username
            }
          }
        `,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      if (!data) {
        throw new Error("No data returned from me query");
      }

      return data.me;
    } catch (error) {
      console.error("Me error:", error);
      throw error;
    }
  },
  login: async (input: LoginInput): Promise<LoginResponse> => {
    try {
      const { data } = await client.mutate<LoginResponse>({
        mutation: LOGIN_MUTATION,
        variables: input,
      });

      if (!data) {
        throw new Error("No data returned from login mutation");
      }

      if (data.signIn.accessToken) {
        localStorage.setItem("authToken", data.signIn.accessToken);
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },

  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  },
};
