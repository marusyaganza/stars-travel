import { describe, it, expect, vi, beforeEach } from "vitest";
import { cookies } from "next/headers";
import {
  createSession,
  getSession,
  deleteSession,
  blacklistToken,
  isTokenBlacklisted,
} from "./session";
import { generateJWT, verifyJWT } from "./jwt";
import { getRedis } from "@/lib/redis";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

// Mock JWT functions
vi.mock("./jwt", () => ({
  generateJWT: vi.fn(),
  verifyJWT: vi.fn(),
}));

// Mock Redis
vi.mock("@/lib/redis", () => ({
  getRedis: vi.fn(),
}));

// Mock logger
vi.mock("@/lib/logger-utils", () => ({
  logError: vi.fn(),
}));

// Define proper types for mocks
type MockCookieStore = {
  get: ReturnType<typeof vi.fn>;
  set: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

type MockRedis = {
  get: ReturnType<typeof vi.fn>;
  setex: ReturnType<typeof vi.fn>;
};

describe("Session Management", () => {
  const mockCookies = vi.mocked(cookies);
  const mockGenerateJWT = vi.mocked(generateJWT);
  const mockVerifyJWT = vi.mocked(verifyJWT);
  const mockGetRedis = vi.mocked(getRedis);

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementations
    mockCookies.mockReturnValue({
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
    } as MockCookieStore);

    mockGenerateJWT.mockResolvedValue("mock-jwt-token");
    mockVerifyJWT.mockResolvedValue({
      userId: "user-123",
      exp: Math.floor(Date.now() / 1000) + 3600,
    });
  });

  describe("createSession", () => {
    it("creates a session successfully", async () => {
      const mockCookieStore: MockCookieStore = {
        set: vi.fn(),
      };
      mockCookies.mockReturnValue(mockCookieStore as MockCookieStore);

      const result = await createSession("user-123");

      expect(result).toBe(true);
      expect(mockGenerateJWT).toHaveBeenCalledWith(
        { userId: "user-123" },
        "1d"
      );
      expect(mockCookieStore.set).toHaveBeenCalledWith({
        name: "auth_token",
        value: "mock-jwt-token",
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24, // 1 day in seconds
        path: "/",
        sameSite: "lax",
      });
    });

    it("handles errors gracefully", async () => {
      mockGenerateJWT.mockRejectedValue(new Error("JWT generation failed"));
      const mockCookieStore: MockCookieStore = {
        set: vi.fn(),
      };
      mockCookies.mockReturnValue(mockCookieStore as MockCookieStore);

      const result = await createSession("user-123");

      expect(result).toBe(false);
    });
  });

  describe("getSession", () => {
    it("returns user session when token is valid", async () => {
      const mockCookieStore: MockCookieStore = {
        get: vi.fn().mockReturnValue({ value: "valid-token" }),
      };
      mockCookies.mockReturnValue(mockCookieStore as MockCookieStore);

      const session = await getSession();

      expect(session).toEqual({ userId: "user-123" });
      expect(mockVerifyJWT).toHaveBeenCalledWith("valid-token");
    });

    it("returns null when no token exists", async () => {
      const mockCookieStore: MockCookieStore = {
        get: vi.fn().mockReturnValue(undefined),
      };
      mockCookies.mockReturnValue(mockCookieStore as MockCookieStore);

      const session = await getSession();

      expect(session).toBeNull();
    });

    it("returns null when token is blacklisted", async () => {
      const mockCookieStore: MockCookieStore = {
        get: vi.fn().mockReturnValue({ value: "blacklisted-token" }),
      };
      mockCookies.mockReturnValue(mockCookieStore as MockCookieStore);

      // Mock Redis to return blacklisted token
      const mockRedis: MockRedis = {
        get: vi.fn().mockResolvedValue("1"),
      };
      mockGetRedis.mockReturnValue(mockRedis as MockRedis);

      const session = await getSession();

      expect(session).toBeNull();
    });
  });

  describe("deleteSession", () => {
    it("deletes session and blacklists token", async () => {
      const mockCookieStore: MockCookieStore = {
        get: vi.fn().mockReturnValue({ value: "token-to-delete" }),
        delete: vi.fn(),
      };
      mockCookies.mockReturnValue(mockCookieStore as MockCookieStore);

      const mockRedis: MockRedis = {
        setex: vi.fn().mockResolvedValue(undefined),
      };
      mockGetRedis.mockReturnValue(mockRedis as MockRedis);

      await deleteSession();

      expect(mockCookieStore.delete).toHaveBeenCalledWith("auth_token");
      expect(mockRedis.setex).toHaveBeenCalled();
    });

    it("handles Redis unavailability gracefully", async () => {
      const mockCookieStore: MockCookieStore = {
        get: vi.fn().mockReturnValue({ value: "token-to-delete" }),
        delete: vi.fn(),
      };
      mockCookies.mockReturnValue(mockCookieStore as MockCookieStore);

      mockGetRedis.mockImplementation(() => {
        throw new Error("Redis not configured");
      });

      await deleteSession();

      expect(mockCookieStore.delete).toHaveBeenCalledWith("auth_token");
    });
  });

  describe("blacklistToken", () => {
    it("blacklists token with correct TTL", async () => {
      const mockRedis: MockRedis = {
        setex: vi.fn().mockResolvedValue(undefined),
      };
      mockGetRedis.mockReturnValue(mockRedis as MockRedis);

      await blacklistToken("token-to-blacklist");

      expect(mockRedis.setex).toHaveBeenCalledWith(
        "blacklisted:token-to-blacklist",
        expect.any(Number),
        "1"
      );
    });

    it("handles Redis unavailability gracefully", async () => {
      mockGetRedis.mockImplementation(() => {
        throw new Error("Redis not configured");
      });

      await expect(blacklistToken("token-to-blacklist")).resolves.not.toThrow();
    });
  });

  describe("isTokenBlacklisted", () => {
    it("returns true for blacklisted token", async () => {
      const mockRedis: MockRedis = {
        get: vi.fn().mockResolvedValue("1"),
      };
      mockGetRedis.mockReturnValue(mockRedis as MockRedis);

      const result = await isTokenBlacklisted("blacklisted-token");

      expect(result).toBe(true);
    });

    it("returns false for non-blacklisted token", async () => {
      const mockRedis: MockRedis = {
        get: vi.fn().mockResolvedValue(null),
      };
      mockGetRedis.mockReturnValue(mockRedis as MockRedis);

      const result = await isTokenBlacklisted("valid-token");

      expect(result).toBe(false);
    });

    it("handles Redis unavailability gracefully", async () => {
      mockGetRedis.mockImplementation(() => {
        throw new Error("Redis not configured");
      });

      const result = await isTokenBlacklisted("any-token");

      expect(result).toBe(false);
    });
  });
});
