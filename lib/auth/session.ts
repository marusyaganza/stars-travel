import { cache } from "react";
import { cookies } from "next/headers";
import { generateJWT, verifyJWT } from "./jwt";
import { JWT_TOKEN_EXPIRES_IN } from "@/constants";
import { logError } from "@/lib/logger-utils";
import { getRedis } from "@/lib/redis";

export async function createSession(userId: string) {
  try {
    const token = await generateJWT({ userId }, JWT_TOKEN_EXPIRES_IN);

    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day in seconds, matching JWT expiration
      path: "/",
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    await logError("Error creating session", error, { userId });
    return false;
  }
}

// Get current session from JWT
export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    // Check if token is blacklisted
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return null;
    }

    const payload = await verifyJWT(token);

    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes("During prerendering, `cookies()` rejects")
    ) {
      await logError(
        "Cookies not available during prerendering, returning null session",
        error
      );
      return null;
    }

    await logError("Error getting session", error);
    return null;
  }
});

// Blacklist a JWT token by storing it in Redis with expiration
export async function blacklistToken(token: string): Promise<void> {
  try {
    const redis = getRedis();
    // Extract expiration from JWT to set TTL in Redis
    const decoded = await verifyJWT(token);
    if (decoded.exp && typeof decoded.exp === "number") {
      const now = Math.floor(Date.now() / 1000);
      const ttl = decoded.exp - now;
      if (ttl > 0) {
        await redis.setex(`blacklisted:${token}`, ttl, "1");
      }
    }
  } catch (error) {
    // If Redis is not available or token is invalid, log but don't fail
    if (
      error instanceof Error &&
      error.message.includes("Redis not configured")
    ) {
      // Redis not available, skip blacklisting
      return;
    }
    await logError("Error blacklisting token", error);
  }
}

// Check if a token is blacklisted
export async function isTokenBlacklisted(token: string): Promise<boolean> {
  try {
    const redis = getRedis();
    const result = await redis.get(`blacklisted:${token}`);
    return result !== null;
  } catch (error) {
    // If Redis is not available, assume token is not blacklisted
    if (
      error instanceof Error &&
      error.message.includes("Redis not configured")
    ) {
      return false;
    }
    await logError("Error checking token blacklist", error);
    return false;
  }
}

// Delete session by clearing the JWT cookie and blacklisting the token
export async function deleteSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Blacklist the token if it exists
    if (token) {
      await blacklistToken(token);
    }

    // Clear the cookie
    cookieStore.delete("auth_token");
  } catch (error) {
    await logError("Error deleting session", error);
    // Still try to clear the cookie even if blacklisting fails
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
  }
}
