import { useState, type FC } from "react";
import $styles from "./MessageInput.module.css";

interface Props {
  onSendMessage: (text: string) => void;
}

const MessageInput: FC<Props> = ({ onSendMessage }) => {
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
    <div className={$styles.MessageInput}>
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendClick} disabled={!text.trim()}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
