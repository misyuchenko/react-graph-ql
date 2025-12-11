import client from "@/apolloClient";
import type { User } from "./auth.types";
export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  signIn: {
    accessToken: string;
  };
}

// export const authService = {
//   whoAmI: async () => {
//     try {
//       const { data } = await client.query<{ whoAmI: User }>({
//         query: WHO_AM_I,
//         fetchPolicy: "no-cache",
//       });

//       if (!data) {
//         throw new Error("No data returned from whoAmI query");
//       }

//       return data.whoAmI;
//     } catch (error) {
//       console.error("whoAmI error:", error);
//       throw error;
//     }
//   },

//   login: async (input: LoginInput): Promise<LoginResponse> => {
//     try {
//       const { data } = await client.mutate<LoginResponse>({
//         mutation: LOGIN_MUTATION,
//         variables: input,
//       });

//       if (!data) {
//         throw new Error("No data returned from login mutation");
//       }

//       if (data.signIn.accessToken) {
//         localStorage.setItem("authToken", data.signIn.accessToken);
//       }

//       return data;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("authToken");
//   },

//   getToken: (): string | null => {
//     return localStorage.getItem("authToken");
//   },

//   isAuthenticated: (): boolean => {
//     return !!localStorage.getItem("authToken");
//   },
// };

// features/auth/services/authService.ts
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authService = {
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  clear(): void {
    this.removeToken();
    this.removeUser();
  },

  hasToken(): boolean {
    return !!this.getToken();
  },
};
