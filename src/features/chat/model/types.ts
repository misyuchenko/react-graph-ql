import type { Chat } from '@/entities/chat';
import type { Message } from '@/entities/message';
import type { User } from '@/entities/user';

export type { Chat, Message };

export interface LoadMessagesInput {
  chatId: string;
  cursor?: string;
}

export interface LoadMessagesResponse {
  loadMessages: Message[];
}

export interface SearchUsersResponse {
  searchUsers: User[];
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