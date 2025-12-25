import { gql, type TypedDocumentNode } from "@apollo/client";
import type { LoginResponse, LoginInput, WhoAmIResponse } from "../model/types";

export const LOGIN_MUTATION: TypedDocumentNode<LoginResponse, LoginInput> = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const WHO_AM_I_QUERY: TypedDocumentNode<WhoAmIResponse> = gql`
  query WhoAmI {
    whoAmI {
      username
    }
  }
`;
