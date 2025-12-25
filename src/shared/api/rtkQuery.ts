import { createApi } from "@reduxjs/toolkit/query/react";
import { GraphQLClient } from "graphql-request";
import { config } from "./config";
import { authService } from "@/features/auth";

const createGraphQLClient = () => {
  const token = authService.getToken();
  return new GraphQLClient(config.graphQlApi, {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
};

const graphqlBaseQuery =
  () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ document, variables }: { document: string; variables?: any }) => {
    try {
      const client = createGraphQLClient();
      const data = await client.request(document, variables);
      return { data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.errors || error.message,
          message: error.message,
        },
      };
    }
  };

export const rtkQueryApi = createApi({
  reducerPath: "rtkQueryApi",
  baseQuery: graphqlBaseQuery(),
  tagTypes: ["UserChats", "Messages", "Auth", "Users"],
  endpoints: () => ({}),
});

export default rtkQueryApi;
