export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AuthPayload = {
  accessToken: Scalars['String']['output'];
};

export type ChatSummary = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  participants: Array<UserSummary>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CreateChatInput = {
  username: Scalars['String']['input'];
};

export type MarkReadInput = {
  chatId: Scalars['ID']['input'];
  seenAt: Scalars['DateTime']['input'];
};

export type Message = {
  chatId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  sender: UserSummary;
  text: Scalars['String']['output'];
};

export type MessageDirection =
  | 'ASC'
  | 'DESC';

export type Mutation = {
  createChat: ChatSummary;
  markChatRead: Scalars['Boolean']['output'];
  sendMessage: Message;
  signIn: AuthPayload;
  signUp: AuthPayload;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationMarkChatReadArgs = {
  input: MarkReadInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  getChats: Array<ChatSummary>;
  loadMessages: Array<Message>;
  sayHello: Scalars['String']['output'];
  searchUsers: Array<UserSummary>;
  whoAmI: UserSummary;
};


export type QueryLoadMessagesArgs = {
  chatId: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
  direction?: InputMaybe<MessageDirection>;
};


export type QuerySearchUsersArgs = {
  username: Scalars['String']['input'];
};

export type SendMessageInput = {
  chatId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type SignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignUpInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserSummary = {
  username: Scalars['String']['output'];
};

export type SayHelloQueryVariables = Exact<{ [key: string]: never; }>;


export type SayHelloQuery = { sayHello: string };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { whoAmI: { username: string } };

export type SearchUsersQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type SearchUsersQuery = { searchUsers: Array<{ username: string }> };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { getChats: Array<{ id: string, title?: string | null, createdAt: string, participants: Array<{ username: string }> }> };

export type LoadMessagesQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
  direction?: InputMaybe<MessageDirection>;
}>;


export type LoadMessagesQuery = { loadMessages: Array<{ id: string, chatId: string, text: string, createdAt: string, sender: { username: string } }> };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { signUp: { accessToken: string } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { signIn: { accessToken: string } };

export type CreateChatMutationVariables = Exact<{
  input: CreateChatInput;
}>;


export type CreateChatMutation = { createChat: { id: string, title?: string | null, createdAt: string, participants: Array<{ username: string }> } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { sendMessage: { id: string, chatId: string, text: string, createdAt: string, sender: { username: string } } };

export type MarkChatReadMutationVariables = Exact<{
  input: MarkReadInput;
}>;


export type MarkChatReadMutation = { markChatRead: boolean };
