import { useEffect } from "react";
import { connectSocket, disconnectSocket, socket } from "@/app/socket";

export const useSocket = () => {
  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return socket;
};
