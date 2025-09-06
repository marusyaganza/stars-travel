"use server";

import OpenAI from "openai";
import { ActionResponse } from "./types";
import { getSession } from "@/lib/auth/session";
import { logError } from "@/lib/logger-utils";
import {
  getOrCreateConversation,
  addMessageToConversation,
} from "@/lib/chat/chatUtils";
import { getSystemPrompt, Character } from "@/lib/chat/systemPrompts";
import { CacheInvalidation } from "@/lib/cache/databaseCache";

export interface ChatMessage {
  content: string;
  isUser: boolean;
}

export interface SendMessageResponse extends ActionResponse {
  response?: string;
  character?: Character;
}

export async function sendMessage(
  message: string,
  character: Character
): Promise<SendMessageResponse> {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required to use the chatbot",
        error: "User not authenticated",
      };
    }

    // Get or create conversation for this user and character
    const conversation = await getOrCreateConversation(
      session.userId,
      character
    );

    // Store the user's message in the database
    await addMessageToConversation(conversation.id, message, true);

    // Validate input
    if (!message || message.trim().length === 0) {
      return {
        success: false,
        message: "Message cannot be empty",
        error: "Invalid message",
      };
    }

    if (!character || !["yoda", "c3po"].includes(character)) {
      return {
        success: false,
        message: "Invalid character selection",
        error: "Invalid character",
      };
    }

    if (!process.env.OPENAI_API_KEY) {
      await logError(
        "OpenAI API key not configured",
        new Error("Missing OPENAI_API_KEY")
      );
      return {
        success: false,
        message: "Chat service is temporarily unavailable",
        error: "OpenAI API key not configured",
      };
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get system prompt based on character
    const systemPrompt = getSystemPrompt(character);

    // Prepare messages for OpenAI using database conversation history
    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      { role: "system", content: systemPrompt },
      ...conversation.messages.map((msg) => ({
        role: (msg.isUser ? "user" : "assistant") as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: message.trim() },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 150,
      temperature: 0.8,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
      stop: ["\n\n", "User:", "Assistant:"], // Natural stopping points
    });
    console.log("completion", completion);
    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return {
        success: false,
        message: "Failed to generate response",
        error: "Empty response from OpenAI",
      };
    }

    // Store the bot's response in the database
    await addMessageToConversation(conversation.id, response.trim(), false);

    await CacheInvalidation.invalidateChatCaches(session.userId);

    return {
      success: true,
      message: "Message sent successfully",
      response: response.trim(),
      character,
    };
  } catch (error) {
    await logError("Error sending message to OpenAI", error, {
      character,
      messageLength: message?.length || 0,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
    });

    // Handle specific OpenAI errors
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });

      if (error.message.includes("API key") || error.message.includes("401")) {
        return {
          success: false,
          message: "Chat service configuration error",
          error: "API key issue",
        };
      }

      if (
        error.message.includes("rate limit") ||
        error.message.includes("429")
      ) {
        return {
          success: false,
          message: "Chat service is busy. Please try again in a moment.",
          error: "Rate limit exceeded",
        };
      }

      if (
        error.message.includes("quota") ||
        error.message.includes("billing")
      ) {
        return {
          success: false,
          message: "Chat service quota exceeded. Please try again later.",
          error: "Quota exceeded",
        };
      }

      if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        return {
          success: false,
          message: "Network error. Please check your connection and try again.",
          error: "Network error",
        };
      }

      // Return the actual error message for debugging
      return {
        success: false,
        message: `Chat service error: ${error.message}`,
        error: error.message,
      };
    }

    return {
      success: false,
      message: "Failed to send message. Please try again.",
      error: "Unknown error occurred",
    };
  }
}
