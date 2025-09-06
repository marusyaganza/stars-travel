import { getRedis } from "@/lib/redis";
import { logError } from "@/lib/logger-utils";

export interface CacheOptions {
  ttl?: number; // Time to live in seconds, default 300 (5 minutes)
  keyPrefix?: string; // Prefix for cache key
  userSpecific?: boolean; // Whether cache should be user-specific
  userId?: string; // User ID for user-specific caching
}

export interface CacheResult<T> {
  success: boolean;
  data?: T;
  fromCache?: boolean;
  error?: string;
}

/**
 * Generate a cache key with proper prefixing and user specificity
 */
function generateCacheKey(baseKey: string, options: CacheOptions = {}): string {
  const { keyPrefix = "db", userSpecific = false, userId } = options;

  if (userSpecific && userId) {
    return `${keyPrefix}:user:${userId}:${baseKey}`;
  }

  return `${keyPrefix}:${baseKey}`;
}

/**
 * Get data from cache (internal use)
 */
async function getFromCache<T>(
  key: string,
  options: CacheOptions = {}
): Promise<CacheResult<T>> {
  try {
    const redis = getRedis();
    const cacheKey = generateCacheKey(key, options);

    const cachedData = await redis.get(cacheKey);

    if (cachedData === null) {
      return {
        success: true,
        fromCache: false,
      };
    }

    const parsedData = JSON.parse(cachedData as string) as T;

    return {
      success: true,
      data: parsedData,
      fromCache: true,
    };
  } catch (error) {
    await logError("Error getting from cache", error, { key, options });
    return {
      success: false,
      error: "Cache retrieval failed",
      fromCache: false,
    };
  }
}

/**
 * Set data in cache (internal use)
 */
async function setInCache<T>(
  key: string,
  data: T,
  options: CacheOptions = {}
): Promise<boolean> {
  try {
    const redis = getRedis();
    const cacheKey = generateCacheKey(key, options);
    const ttl = options.ttl || 300; // Default 5 minutes

    await redis.setex(cacheKey, ttl, JSON.stringify(data));
    return true;
  } catch (error) {
    await logError("Error setting cache", error, { key, options });
    return false;
  }
}

/**
 * Invalidate cache patterns (useful for related data)
 */
export async function invalidateCachePattern(
  pattern: string,
  options: CacheOptions = {}
): Promise<number> {
  try {
    const redis = getRedis();
    const { keyPrefix = "db", userSpecific = false, userId } = options;

    let searchPattern: string;
    if (userSpecific && userId) {
      searchPattern = `${keyPrefix}:user:${userId}:${pattern}*`;
    } else {
      searchPattern = `${keyPrefix}:${pattern}*`;
    }

    const keys = await redis.keys(searchPattern);

    if (keys.length === 0) {
      return 0;
    }

    return await redis.del(...keys);
  } catch (error) {
    await logError("Error invalidating cache pattern", error, {
      pattern,
      options,
    });
    return 0;
  }
}

/**
 * Cache wrapper for database queries with automatic fallback
 */
export async function withCache<T>(
  key: string,
  queryFn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<CacheResult<T>> {
  // Try to get from cache first
  const cacheResult = await getFromCache<T>(key, options);

  if (cacheResult.success && cacheResult.fromCache && cacheResult.data) {
    return cacheResult;
  }

  // If not in cache or cache miss, execute query
  try {
    const data = await queryFn();

    // Store in cache for future requests
    await setInCache(key, data, options);

    return {
      success: true,
      data,
      fromCache: false,
    };
  } catch (error) {
    await logError("Error executing cached query", error, { key, options });
    return {
      success: false,
      error: "Query execution failed",
      fromCache: false,
    };
  }
}

/**
 * Cache invalidation helpers for common scenarios
 */
export const CacheInvalidation = {
  /**
   * Invalidate all flight-related caches
   */
  async invalidateFlights(): Promise<void> {
    await invalidateCachePattern("flights");
  },

  /**
   * Invalidate user-specific caches
   */
  async invalidateUserCaches(userId: string): Promise<void> {
    await invalidateCachePattern("", { userSpecific: true, userId });
  },

  /**
   * Invalidate chat-related caches for a user
   */
  async invalidateChatCaches(userId: string): Promise<void> {
    await invalidateCachePattern("chat", { userSpecific: true, userId });
  },

  /**
   * Invalidate all caches (use with caution)
   */
  async invalidateAll(): Promise<void> {
    await invalidateCachePattern("");
  },
};
