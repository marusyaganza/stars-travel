import React, { forwardRef } from "react";
import styles from "./StarWarsChatbot.module.css";

interface ChatbotInputProps {
  userInput: string;
  currentCharacter: "yoda" | "c3po";
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

export const ChatbotInput = forwardRef<HTMLInputElement, ChatbotInputProps>(
  (
    { userInput, currentCharacter, onInputChange, onSendMessage, onKeyPress },
    ref
  ) => {
    return (
      <div className={styles.chatbotInput}>
        <input
          ref={ref}
          type="text"
          id="userInput"
          placeholder={
            currentCharacter === "yoda" ? "Ask Master Yoda..." : "Ask C-3PO..."
          }
          value={userInput}
          onChange={onInputChange}
          onKeyPress={onKeyPress}
        />
        <button onClick={onSendMessage}>Send</button>
      </div>
    );
  }
);

ChatbotInput.displayName = "ChatbotInput";
