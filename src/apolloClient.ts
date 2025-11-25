import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {config} from '@/config'
const URL = config.graphQlApi;

const httpLink = new HttpLink({
  uri: URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


export default client;
