import { io, Socket } from "socket.io-client";
import { config } from "@/shared/api/config";
import { SocketEvent } from "./types";
import type {
  JoinChannelDto,
  LeaveChannelDto,
  Message,
  ChatSummary,
} from "./types";

export const socket: Socket = io(config.websocketApi, {
  transports: ["polling", "websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

socket.on("connect", () => {
  console.log("[WebSocket] Connected to server, socket ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("[WebSocket] Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("[WebSocket] Connection error:", error.message);
});

export const joinChat = (channelId: string) => {
  if (!socket.connected) {
    console.warn(
      "[WebSocket] Socket not connected. Call connectSocket() first.",
    );
    return;
  }

  const payload: JoinChannelDto = { channelId };
  console.log("[WebSocket] Joining chat:", channelId);
  socket.emit(SocketEvent.JOIN_CHAT, payload);
};

export const leaveChat = (channelId: string) => {
  if (!socket.connected) {
    console.warn("[WebSocket] Socket not connected.");
    return;
  }

  const payload: LeaveChannelDto = { channelId };
  console.log("[WebSocket] Leaving chat:", channelId);
  socket.emit(SocketEvent.LEAVE_CHAT, payload);
};

const messageHandlers = new Map<
  (message: Message) => void,
  (message: Message) => void
>();

const chatHandlers = new Map<
  (chat: ChatSummary) => void,
  (chat: ChatSummary) => void
>();

export const onNewMessage = (callback: (message: Message) => void) => {
  console.log("[WebSocket] Subscribing to NEW_MESSAGE events");

  const wrappedCallback = (message: Message) => {
    console.log("[WebSocket] Received NEW_MESSAGE:", message);
    callback(message);
  };

  messageHandlers.set(callback, wrappedCallback);

  socket.on(SocketEvent.NEW_MESSAGE, wrappedCallback);
};

export const onNewChat = (callback: (chat: ChatSummary) => void) => {
  console.log("[WebSocket] Subscribing to NEW_CHAT events");

  const wrappedCallback = (chat: ChatSummary) => {
    console.log("[WebSocket] Received NEW_CHAT:", chat);
    callback(chat);
  };

  chatHandlers.set(callback, wrappedCallback);

  socket.on(SocketEvent.NEW_CHAT, wrappedCallback);
};

export const offNewMessage = (callback?: (message: Message) => void) => {
  console.log("[WebSocket] Unsubscribing from NEW_MESSAGE events");

  if (callback) {
    const wrappedCallback = messageHandlers.get(callback);
    if (wrappedCallback) {
      socket.off(SocketEvent.NEW_MESSAGE, wrappedCallback);
      messageHandlers.delete(callback);
    }
  } else {
    socket.off(SocketEvent.NEW_MESSAGE);
    messageHandlers.clear();
  }
};

export const offNewChat = (callback?: (chat: ChatSummary) => void) => {
  console.log("[WebSocket] Unsubscribing from NEW_CHAT events");

  if (callback) {
    const wrappedCallback = chatHandlers.get(callback);
    if (wrappedCallback) {
      socket.off(SocketEvent.NEW_CHAT, wrappedCallback);
      chatHandlers.delete(callback);
    }
  } else {
    socket.off(SocketEvent.NEW_CHAT);
    chatHandlers.clear();
  }
};

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
