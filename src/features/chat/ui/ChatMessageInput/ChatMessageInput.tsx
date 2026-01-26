import { useState, type FC } from "react";
import styles from "./ChatMessageInput.module.scss";
import Button from "@/shared/ui/Button/Button";
interface Props {
  onSendMessage: (text: string) => void;
}

const ChatMessageInput: FC<Props> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSendClick = () => {
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <div className={styles.chatMessageInput}>
      <input
        className={styles.input}
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSendClick} disabled={!text.trim()}>
        Send
      </Button>
    </div>
  );
};

export default ChatMessageInput;
