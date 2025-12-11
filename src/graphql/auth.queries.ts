import { gql, type TypedDocumentNode } from "@apollo/client";

export const LOGIN_MUTATION: TypedDocumentNode<{ signIn: { accessToken: string }}> = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      username
    }
  }
`;
