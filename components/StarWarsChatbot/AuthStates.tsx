import React from "react";
import Link from "next/link";
import { ChatbotHeader } from "./ChatbotHeader";
import styles from "./StarWarsChatbot.module.css";

interface AuthStatesProps {
  isMinimized: boolean;
  onToggle: () => void;
  isLoadingHistory: boolean;
  showScrollbar: boolean;
}

export const LoadingState: React.FC<AuthStatesProps> = ({
  isMinimized,
  onToggle,
  isLoadingHistory,
  showScrollbar,
}) => {
  return (
    <div className={`${styles.chatbot} ${isMinimized ? styles.minimized : ""}`}>
      <ChatbotHeader
        isMinimized={isMinimized}
        currentCharacter="yoda"
        onToggle={onToggle}
      />
      {!isMinimized && (
        <div
          className={`${styles.chatbotMessages} ${
            !showScrollbar ? styles.autoHideScrollbar : ""
          }`}
        >
          <div className={`${styles.message} ${styles.yodaMessage}`}>
            {isLoadingHistory
              ? "Loading chat history..."
              : "Checking authentication..."}
          </div>
        </div>
      )}
    </div>
  );
};

export const UnauthenticatedState: React.FC<AuthStatesProps> = ({
  isMinimized,
  onToggle,
  showScrollbar,
}) => {
  return (
    <div className={`${styles.chatbot} ${isMinimized ? styles.minimized : ""}`}>
      <ChatbotHeader
        isMinimized={isMinimized}
        currentCharacter="yoda"
        onToggle={onToggle}
      />
      {!isMinimized && (
        <div
          className={`${styles.chatbotMessages} ${
            !showScrollbar ? styles.autoHideScrollbar : ""
          }`}
        >
          <div className={`${styles.message} ${styles.yodaMessage}`}>
            Welcome, young one. To chat with Master Yoda or C-3PO, you must
            first be registered in our system.
          </div>
          <div className={`${styles.message} ${styles.c3poMessage}`}>
            Oh my! I&apos;m afraid I can only assist registered users. Please
            sign in to continue our conversation!
          </div>
          <div className={styles.loginPrompt}>
            <Link href="/signin" className={styles.loginLink}>
              Sign In to Continue
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
