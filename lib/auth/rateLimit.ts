import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";
import logger from "@/lib/logger";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message: string; // Error message when limit exceeded
  statusCode: number; // HTTP status code for rate limit exceeded
}

interface RateLimitResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  remaining?: number;
  resetTime?: Date;
}

// Rate limit configurations
export const RATE_LIMIT_CONFIGS = {
  // Sign in: 5 attempts per 15 minutes
  SIGN_IN: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: "Too many sign-in attempts. Please try again later.",
    statusCode: 429,
  },
  // Sign up: 3 attempts per hour
  SIGN_UP: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    message: "Too many sign-up attempts. Please try again later.",
    statusCode: 429,
  },
  // General auth: 10 attempts per 15 minutes (for authentication actions only)
  GENERAL_AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
    message: "Too many authentication attempts. Please try again later.",
    statusCode: 429,
  },
  // CSRF token generation: 20 requests per 15 minutes
  CSRF: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 20,
    message: "Too many CSRF token requests. Please try again later.",
    statusCode: 429,
  },
} as const;

/**
 * Get client IP address from request headers
 * Handles Vercel and other hosting environments correctly
 */
async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers();

    const vercelIP = headersList.get("x-vercel-ip");
    const vercelForwardedFor = headersList.get("x-vercel-forwarded-for");

    // Standard proxy headers
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIP = headersList.get("x-real-ip");
    const clientIP = headersList.get("x-client-ip");

    if (vercelIP) {
      return vercelIP;
    }

    if (vercelForwardedFor) {
      // x-vercel-forwarded-for can contain multiple IPs, take the first one (real client)
      return vercelForwardedFor.split(",")[0].trim();
    }

    if (forwardedFor) {
      // x-forwarded-for can contain multiple IPs, take the first one (real client)
      return forwardedFor.split(",")[0].trim();
    }

    if (realIP) {
      return realIP;
    }

    if (clientIP) {
      return clientIP;
    }

    // Fallback to localhost for development
    return "127.0.0.1";
  } catch {
    // If headers() fails (e.g., during build time), return a fallback
    return "127.0.0.1";
  }
}

/**
 * Create a rate limiter instance for a specific configuration
 */
function createRateLimiter(config: RateLimitConfig): Ratelimit {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(
      config.maxRequests,
      `${config.windowMs}ms`
    ),
    analytics: true,
    prefix: "upstash:ratelimit",
  });
}

/**
 * Check if a request is within rate limits
 */
export async function checkRateLimit(
  config: RateLimitConfig,
  identifier?: string
): Promise<RateLimitResult> {
  try {
    const clientIP = await getClientIP();
    const key = identifier ? `${clientIP}:${identifier}` : clientIP;

    const rateLimiter = createRateLimiter(config);
    const result = await rateLimiter.limit(key);

    if (!result.success) {
      // Rate limit exceeded
      await logger.warn({
        message: "Rate limit exceeded",
        data: {
          ip: clientIP,
          identifier,
          limit: config.maxRequests,
          windowMs: config.windowMs,
          reset: result.reset,
          key: key, // Include the full key for debugging
        },
      });

      return {
        success: false,
        message: config.message,
        statusCode: config.statusCode,
        resetTime: new Date(result.reset),
      };
    }

    return {
      success: true,
      remaining: result.remaining,
      resetTime: new Date(result.reset),
    };
  } catch (error) {
    // If rate limiting fails, log the error but allow the request to proceed
    await logger.error({
      message: "Rate limiting error",
      err: error,
      data: { identifier },
    });

    return { success: true };
  }
}

/**
 * Rate limit decorator for server actions
 */
export function withRateLimit<T extends unknown[], R>(
  config: RateLimitConfig,
  identifier?: string
) {
  return function (fn: (...args: T) => Promise<R>) {
    return async function (...args: T): Promise<R> {
      const rateLimitResult = await checkRateLimit(config, identifier);

      if (!rateLimitResult.success) {
        throw new Error(rateLimitResult.message);
      }

      return fn(...args);
    };
  };
}

/**
 * Rate limit wrapper for server actions that return specific types
 */
export function withRateLimitAction<T extends unknown[], R>(
  config: RateLimitConfig,
  identifier?: string
) {
  return function (fn: (...args: T) => Promise<R>) {
    return async function (...args: T): Promise<R> {
      const rateLimitResult = await checkRateLimit(config, identifier);

      if (!rateLimitResult.success) {
        throw new Error(rateLimitResult.message);
      }

      return fn(...args);
    };
  };
}

/**
 * Get rate limit info for a specific endpoint
 */
export async function getRateLimitInfo(
  config: RateLimitConfig,
  identifier?: string
): Promise<{ remaining: number; resetTime: Date } | null> {
  try {
    const clientIP = await getClientIP();
    const key = identifier ? `${clientIP}:${identifier}` : clientIP;

    const rateLimiter = createRateLimiter(config);
    const result = await rateLimiter.limit(key);

    return {
      remaining: result.remaining,
      resetTime: new Date(result.reset),
    };
  } catch {
    return null;
  }
}
