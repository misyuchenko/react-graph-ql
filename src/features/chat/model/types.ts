export interface LoadMessagesInput {
  chatId: string;
  cursor?: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: {
    username: string;
  };
  text: string;
  createdAt: string;
}

export interface LoadMessagesResponse {
  loadMessages: Message[];
}

export interface SearchUsersResponse {
  searchUsers: {
    username: string;
  }[];
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  participants: {
    username: string;
  }[];
}

export interface GetUserChatsResponse {
  getChats: Chat[];
}

export interface CreateChatInput {
  username: string;
}

export interface CreateChatResponse {
  createChat: Chat;
}

export interface SendMessageInput {
  chatId: string;
  text: string;
}

export interface SendMessageResponse {
  sendMessage: Message;
}