import { db } from "../db";
import { hashPassword } from "./password";
import { getSession } from "./session";
import { cache } from "react";
import { logError } from "@/lib/logger-utils";
import { z } from "zod";
import { UserCreateSchema } from "../validation/user";
import { SecureCache, CACHE_CONFIG, CacheKeys } from "@/lib/cache/secureCache";

type UserCreateData = z.infer<typeof UserCreateSchema>;

export type GetCurrentUserResult = {
  success: boolean;
  data?: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    bookings: { id: string }[];
  };
  error?: string;
};

export async function createUser(userInput: UserCreateData) {
  const { name, email, password, role } = userInput;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await db.user.create({
      data: { email, password: hashedPassword, name, role },
    });

    return { id: user.id, email };
  } catch (error) {
    await logError("Error creating user", error, { email, role });
    return null;
  }
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export const getCurrentUser = cache(
  async function getCurrentUserFunc(): Promise<GetCurrentUserResult> {
    try {
      const sessionData = await getSession();
      if (!sessionData?.userId) {
        return {
          success: false,
          error: "User not authenticated. Please sign in again.",
        };
      }

      const cacheKey = CacheKeys.user.profile(sessionData.userId);

      const result = await SecureCache.cacheForUser(
        sessionData.userId,
        cacheKey,
        async () => {
          const user = await db.user.findUnique({
            where: { id: sessionData.userId },
            include: {
              bookings: {
                select: { id: true },
              },
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            bookings: user.bookings,
          };
        },
        {
          ttl: CACHE_CONFIG.USER.PROFILE,
        }
      );

      if (!result.success) {
        if (result.error === "User not found") {
          return {
            success: false,
            error: "User not found. Please try signing in again.",
          };
        }

        await logError(
          "Error fetching current user",
          new Error(result.error),
          {}
        );
        return {
          success: false,
          error: "Failed to load user data. Please try again later.",
        };
      }

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      await logError("Error fetching current user", error, {});
      return {
        success: false,
        error: "Failed to load user data. Please try again later.",
      };
    }
  }
);

export async function checkUserExists(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({ where: { id: userId } });
  return Boolean(user);
}
