import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { authService } from "@/features/auth";
import { config } from "./config";

const httpLink = new HttpLink({
  uri: config.graphQlApi,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = authService.getToken();

  operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => {
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
    return { headers };
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
