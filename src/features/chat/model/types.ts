// Re-export entity types
export type { ChatSummary as Chat } from "@/shared/api/generated/graphql";
export type { Message } from "@/shared/api/generated/graphql";

// Re-export GraphQL types
export type { MessageDirection } from "@/shared/api/generated/graphql";
export type { LoadMessagesQueryVariables as LoadMessagesInput } from "@/shared/api/generated/graphql";
export type { LoadMessagesQuery as LoadMessagesResponse } from "@/shared/api/generated/graphql";
export type { SearchUsersQuery as SearchUsersResponse } from "@/shared/api/generated/graphql";
export type { GetChatsQuery as GetUserChatsResponse } from "@/shared/api/generated/graphql";
export type { CreateChatInput } from "@/shared/api/generated/graphql";
export type { CreateChatMutation as CreateChatResponse } from "@/shared/api/generated/graphql";
export type { SendMessageInput } from "@/shared/api/generated/graphql";
export type { SendMessageMutation as SendMessageResponse } from "@/shared/api/generated/graphql";
