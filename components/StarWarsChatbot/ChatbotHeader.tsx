import React from "react";
import Image from "next/image";
import { OpenAIIcon } from "@/components/icons/OpenAIIcon";
import { BotSparkleIcon } from "@/components/icons/BotSparkleIcon";
import styles from "./StarWarsChatbot.module.css";

interface ChatbotHeaderProps {
  isMinimized: boolean;
  currentCharacter: "yoda" | "c3po";
  onToggle: () => void;
  showCharacterIcon?: boolean;
}

export const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  isMinimized,
  currentCharacter,
  onToggle,
  showCharacterIcon = false,
}) => {
  return (
    <div className={styles.chatbotHeader} onClick={onToggle}>
      <div>
        <h4 id="chatbotTitle">
          {showCharacterIcon ? (
            currentCharacter === "yoda" ? (
              <>
                <Image
                  src="/img/yoda.png"
                  alt="Master Yoda"
                  width={40}
                  height={40}
                  className={styles.characterIcon}
                />
                Master Yoda
              </>
            ) : (
              <>
                <Image
                  src="/img/c3po.png"
                  alt="C-3PO"
                  width={40}
                  height={40}
                  className={styles.characterIcon}
                />
                C-3PO
              </>
            )
          ) : (
            <>
              <BotSparkleIcon width={20} height={20} />
              Stars Travel Assistant
            </>
          )}
        </h4>
        <div className={styles.poweredBy}>
          <span>powered by OpenAI</span>
          <OpenAIIcon width={12} height={12} />
        </div>
      </div>
      <button className={styles.minimizeBtn} id="minimizeBtn">
        {isMinimized ? "+" : "−"}
      </button>
    </div>
  );
};
