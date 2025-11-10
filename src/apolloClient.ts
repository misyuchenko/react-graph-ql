import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const URL = "https://chats-api.mysterygateway.ru/graphql";

const httpLink = new HttpLink({
  uri: URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
