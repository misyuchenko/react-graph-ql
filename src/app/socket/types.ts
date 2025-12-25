export const SocketEvent = {
  JOIN_CHAT: "JOIN_CHAT",
  LEAVE_CHAT: "LEAVE_CHAT",
  NEW_MESSAGE: "NEW_MESSAGE",
  NEW_CHAT: "NEW_CHAT",
} as const;

export type SocketEvent = (typeof SocketEvent)[keyof typeof SocketEvent];

export interface JoinChannelDto {
  channelId: string;
}

export interface LeaveChannelDto {
  channelId: string;
}

export interface UserSummary {
  username: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: UserSummary;
  text: string;
  createdAt: string;
}

export interface ChatSummary {
  id: string;
  title: object;
  createdAt: string;
  participants: string[];
}
