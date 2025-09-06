import React, { forwardRef } from "react";
import styles from "./StarWarsChatbot.module.css";

interface Message {
  content: string;
  isUser: boolean;
}

interface MessagesContainerProps {
  messages: Message[];
  currentCharacter: "yoda" | "c3po";
  isTyping: boolean;
  showScrollbar: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const MessagesContainer = forwardRef<
  HTMLDivElement,
  MessagesContainerProps
>(
  (
    { messages, currentCharacter, isTyping, showScrollbar, messagesEndRef },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.chatbotMessages} ${
          !showScrollbar ? styles["auto-hide-scrollbar"] : ""
        }`}
        id="messages"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.isUser
                ? styles.userMessage
                : currentCharacter === "yoda"
                ? styles.yodaMessage
                : styles.c3poMessage
            }`}
          >
            {msg.content}
          </div>
        ))}

        {isTyping && (
          <div
            className={`${styles.typingIndicator} ${
              currentCharacter === "c3po" ? styles.c3po : ""
            }`}
          >
            <div className={styles.typingDots}>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    );
  }
);

MessagesContainer.displayName = "MessagesContainer";
