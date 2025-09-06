import { withCache, CacheOptions, CacheResult } from "./databaseCache";

/**
 * Secure cache wrapper that ensures user authentication and data isolation
 */
export class SecureCache {
  /**
   * Cache public data (no authentication required)
   */
  static async cachePublic<T>(
    key: string,
    queryFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<CacheResult<T>> {
    return await withCache(key, queryFn, options);
  }

  /**
   * Cache user-specific data with explicit user ID
   */
  static async cacheForUser<T>(
    userId: string,
    key: string,
    queryFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<CacheResult<T>> {
    const userOptions: CacheOptions = {
      ...options,
      userSpecific: true,
      userId,
    };

    return await withCache(key, queryFn, userOptions);
  }
}

/**
 * Cache configuration constants
 */
export const CACHE_CONFIG = {
  // Flight data cache times
  FLIGHTS: {
    ALL_FLIGHTS: 300, // 5 minutes
    CURRENT_FLIGHTS: 180, // 3 minutes
  },

  // User data cache times
  USER: {
    PROFILE: 600, // 10 minutes
  },

  // Chat data cache times
  CHAT: {
    CONVERSATION: 60, // 1 minute
  },
} as const;

/**
 * Cache key generators for consistent key naming
 */
export const CacheKeys = {
  flights: {
    all: (filter?: object) => `flights:all:${JSON.stringify(filter || {})}`,
    current: (filter?: object) =>
      `flights:current:${JSON.stringify(filter || {})}`,
  },

  user: {
    profile: (userId: string) => `user:profile:${userId}`,
  },

  chat: {
    conversation: (userId: string, character: string) =>
      `chat:conversation:${userId}:${character}`,
  },
} as const;
