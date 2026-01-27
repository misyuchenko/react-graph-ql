import { memo } from "react";
import styles from "./ChatHeader.module.css";

interface Props {
  chatWith?: string;
}

const ChatHeader: React.FC<Props> = ({ chatWith }) => {
  return (
    <h1 className={styles.chatHeader}>
      {chatWith ? `Chat with ${chatWith}` : "No chat selected"}
    </h1>
  );
};
export default memo(ChatHeader);
