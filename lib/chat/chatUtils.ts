import { db } from "@/lib/db";
import { ChatCharacter } from "@prisma/client";
import { SecureCache, CACHE_CONFIG, CacheKeys } from "@/lib/cache/secureCache";

export interface ChatMessageData {
  content: string;
  isUser: boolean;
}

export interface ChatConversationData {
  userId: string;
  character: ChatCharacter;
  title?: string;
}

/**
 * Get or create a chat conversation for a user and character
 */
export async function getOrCreateConversation(
  userId: string,
  character: "yoda" | "c3po"
): Promise<{ id: string; messages: ChatMessageData[] }> {
  const cacheKey = CacheKeys.chat.conversation(userId, character);

  const result = await SecureCache.cacheForUser(
    userId,
    cacheKey,
    async () => {
      const chatCharacter =
        character === "yoda" ? ChatCharacter.YODA : ChatCharacter.C3PO;

      // Try to find an existing conversation
      let conversation = await db.chatConversation.findFirst({
        where: {
          userId,
          character: chatCharacter,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      // If no conversation exists, create a new one
      if (!conversation) {
        conversation = await db.chatConversation.create({
          data: {
            userId,
            character: chatCharacter,
            title: `Chat with ${
              character === "yoda" ? "Master Yoda" : "C-3PO"
            }`,
          },
          include: {
            messages: true,
          },
        });
      }

      return {
        id: conversation.id,
        messages: conversation.messages.map((msg) => ({
          content: msg.content,
          isUser: msg.isUser,
        })),
      };
    },
    {
      ttl: CACHE_CONFIG.CHAT.CONVERSATION,
    }
  );

  if (!result.success) {
    throw new Error("Failed to get or create conversation");
  }

  return result.data!;
}

/**
 * Add a message to a conversation
 */
export async function addMessageToConversation(
  conversationId: string,
  content: string,
  isUser: boolean
): Promise<void> {
  await db.chatMessage.create({
    data: {
      conversationId,
      content,
      isUser,
    },
  });

  // Update the conversation's updatedAt timestamp
  await db.chatConversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });
}
