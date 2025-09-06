"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-hot-toast";
import styles from "./StarWarsChatbot.module.css";
import { checkAuth } from "@/actions/auth/checkAuth";
import { sendMessage } from "@/actions/sendMessage";
import { loadChatHistory } from "@/actions/loadChatHistory";
import { getCharacterResponse } from "./characterResponses";
import { ChatbotHeader } from "./ChatbotHeader";
import { CharacterSelector } from "./CharacterSelector";
import { MessagesContainer } from "./MessagesContainer";
import { ChatbotInput } from "./ChatbotInput";
import { LoadingState, UnauthenticatedState } from "./AuthStates";
import { ChatHistory, Character } from "./types";

const DEFAULT_MESSAGES = {
  yoda: "Welcome, young one. Seek wisdom, do you? Ask me anything, you may. Guide you on your path, I will.",
  c3po: "Oh my! How wonderful it is to meet you! I am C-3PO, human-cyborg relations. I am fluent in over six million forms of communication. How may I assist you today?",
} as const;

const SCROLL_TIMEOUT = 2000;
const SCROLL_DELAY = 100;

export const StarWarsChatbot: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character>("yoda");
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showScrollbar, setShowScrollbar] = useState(true);
  const [chatHistories, setChatHistories] = useState<ChatHistory>({
    yoda: [],
    c3po: [],
  });
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentMessages = useMemo(
    () => chatHistories[currentCharacter],
    [chatHistories, currentCharacter]
  );

  // Load chat history for a specific character
  const loadChatHistoryForCharacter = useCallback(
    async (character: Character) => {
      if (!isAuthenticated) return;

      setIsLoadingHistory(true);
      try {
        const result = await loadChatHistory(character);
        if (result.success && result.messages) {
          setChatHistories((prev) => ({
            ...prev,
            [character]: result.messages || [],
          }));
        } else {
          // If no history exists, add default welcome message
          const defaultMessage = DEFAULT_MESSAGES[character];
          setChatHistories((prev) => ({
            ...prev,
            [character]: [{ content: defaultMessage, isUser: false }],
          }));
        }
      } catch {
        toast.error("Failed to load chat history. Please try again.");
      } finally {
        setIsLoadingHistory(false);
      }
    },
    [isAuthenticated]
  );

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      const messagesContainer = messagesContainerRef.current;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, SCROLL_DELAY);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initializeChatbot() {
      try {
        const authStatus = await checkAuth();
        if (isMounted) {
          setIsAuthenticated(authStatus);
          if (authStatus) {
            // Load chat history for the current character when authenticated
            await loadChatHistoryForCharacter(currentCharacter);
            scrollToBottom();
          }
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    }

    initializeChatbot();

    return () => {
      isMounted = false;
    };
  }, [currentCharacter, loadChatHistoryForCharacter, scrollToBottom]);

  const handleScroll = useCallback(() => {
    // Show scrollbar when scrolling
    setShowScrollbar(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setShowScrollbar(false);
    }, SCROLL_TIMEOUT);
  }, []);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;

    if (messagesContainer) {
      messagesContainer.addEventListener("scroll", handleScroll);

      scrollToBottom();

      return () => {
        messagesContainer.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [chatHistories, isTyping, handleScroll, scrollToBottom]);

  const toggleChatbot = () => {
    setIsMinimized(!isMinimized);
  };

  const switchCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCharacter = event.target.value as Character;
    if (newCharacter !== currentCharacter) {
      setCurrentCharacter(newCharacter);
    }
  };

  const addMessage = useCallback(
    (content: string, isUser: boolean = false) => {
      setChatHistories((prev) => ({
        ...prev,
        [currentCharacter]: [...prev[currentCharacter], { content, isUser }],
      }));

      // Show scrollbar when new message is added
      setShowScrollbar(true);

      // Clear existing timeout and set new one to hide scrollbar
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setShowScrollbar(false);
      }, SCROLL_TIMEOUT);
    },
    [currentCharacter]
  );

  const showTypingIndicator = () => {
    setIsTyping(true);
  };

  const hideTypingIndicator = () => {
    setIsTyping(false);
  };

  const handleSendMessage = useCallback(async () => {
    const message = userInput.trim();

    if (message) {
      addMessage(message, true);
      setUserInput("");

      showTypingIndicator();

      try {
        const result = await sendMessage(message, currentCharacter);

        hideTypingIndicator();
        console.log("result", result);

        if (result.success && result.response) {
          addMessage(result.response);
          // Reload chat history to get the latest messages from database
          loadChatHistoryForCharacter(currentCharacter);
        } else {
          // Fallback to local responses if OpenAI fails
          const fallbackResponse = getCharacterResponse(
            currentCharacter,
            message
          );
          addMessage(fallbackResponse);
        }
      } catch {
        toast.error("Failed to send message. Using fallback response.");
        hideTypingIndicator();
        // Fallback to local responses on error
        const fallbackResponse = getCharacterResponse(
          currentCharacter,
          message
        );
        addMessage(fallbackResponse);
      }
    }
  }, [userInput, addMessage, currentCharacter, loadChatHistoryForCharacter]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  if (isAuthenticated === null) {
    return (
      <LoadingState
        isMinimized={isMinimized}
        onToggle={toggleChatbot}
        isLoadingHistory={isLoadingHistory}
        showScrollbar={showScrollbar}
      />
    );
  }

  // Show login prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <UnauthenticatedState
        isMinimized={isMinimized}
        onToggle={toggleChatbot}
        isLoadingHistory={false}
        showScrollbar={showScrollbar}
      />
    );
  }

  // Show full chatbot for authenticated users
  return (
    <div className={`${styles.chatbot} ${isMinimized ? styles.minimized : ""}`}>
      <ChatbotHeader
        isMinimized={isMinimized}
        currentCharacter={currentCharacter}
        onToggle={toggleChatbot}
        showCharacterIcon={true}
      />

      <CharacterSelector
        currentCharacter={currentCharacter}
        onCharacterChange={switchCharacter}
      />

      <MessagesContainer
        ref={messagesContainerRef}
        messages={currentMessages}
        currentCharacter={currentCharacter}
        isTyping={isTyping}
        showScrollbar={showScrollbar}
        messagesEndRef={messagesEndRef}
      />

      <ChatbotInput
        ref={inputRef}
        userInput={userInput}
        currentCharacter={currentCharacter}
        onInputChange={(e) => setUserInput(e.target.value)}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
