import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { config } from "@/config";
import { store } from "./app/store";

const URL = config.graphQlApi;

const httpLink = new HttpLink({
  uri: URL,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = store.getState().auth.token;

  operation.setContext(({ headers = {} }) => {
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
