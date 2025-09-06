"use server";

import { getSession } from "@/lib/auth/session";
import { getOrCreateConversation } from "@/lib/chat/chatUtils";
import { ActionResponse } from "./types";

export interface LoadChatHistoryResponse extends ActionResponse {
  messages?: Array<{
    content: string;
    isUser: boolean;
  }>;
  conversationId?: string;
}

export async function loadChatHistory(
  character: "yoda" | "c3po"
): Promise<LoadChatHistoryResponse> {
  try {
    // Check if user is authenticated
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required to load chat history",
        error: "User not authenticated",
      };
    }

    // Validate character
    if (!character || !["yoda", "c3po"].includes(character)) {
      return {
        success: false,
        message: "Invalid character selection",
        error: "Invalid character",
      };
    }

    // Get or create conversation for this user and character
    const conversation = await getOrCreateConversation(
      session.userId,
      character
    );

    return {
      success: true,
      message: "Chat history loaded successfully",
      messages: conversation.messages,
      conversationId: conversation.id,
    };
  } catch (error) {
    console.error("Error loading chat history:", error);
    return {
      success: false,
      message: "Failed to load chat history",
      error: "Database error",
    };
  }
}
