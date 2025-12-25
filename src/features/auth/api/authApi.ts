import { rtkQueryApi } from "@/shared/api/rtkQuery";
import type { LoginResponse, LoginInput, WhoAmIResponse, User } from "../model/types";

const LOGIN_MUTATION = `
  mutation SignIn($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

const WHO_AM_I_QUERY = `
  query WhoAmI {
    whoAmI {
      username
    }
  }
`;

export const authApi = rtkQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginInput>({
      query: (credentials) => ({
        document: LOGIN_MUTATION,
        variables: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    whoAmI: builder.query<User, void>({
      query: () => ({
        document: WHO_AM_I_QUERY,
      }),
      transformResponse: (response: WhoAmIResponse) => response.whoAmI,
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useWhoAmIQuery, useLazyWhoAmIQuery } = authApi;
