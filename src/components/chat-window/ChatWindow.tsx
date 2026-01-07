import { useState, type FC } from "react";
import $style from "./ChatWindow.module.css";

const ChatWindow: FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  return <section className={$style.container}>

  </section>;
};

export default ChatWindow;
