import { Redis } from "@upstash/redis";

// Initialize Redis client (only if environment variables are set)
let redis: Redis | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Get Redis client (throws error if not configured)
export function getRedis(): Redis {
  if (!redis) {
    throw new Error(
      "Redis not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables."
    );
  }
  return redis;
}

// Test Redis connection
export async function testRedisConnection(): Promise<boolean> {
  try {
    if (!redis) {
      return false;
    }
    await redis.ping();
    return true;
  } catch (error) {
    console.error("Redis connection failed:", error);
    return false;
  }
}
