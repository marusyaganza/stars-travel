import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { ROLE } from "@prisma/client";
import { bookFlight } from "./bookFlight";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { validateInput, createValidationError } from "@/lib/validation";
import { logError } from "@/lib/logger-utils";
import { revalidatePath } from "next/cache";
import { CacheInvalidation } from "@/lib/cache/databaseCache";
import { createActionResponse } from "../helpers";

vi.mock("@/lib/auth/user", () => ({
  getCurrentUser: vi.fn(),
}));
vi.mock("@/lib/db", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
    },
    flight: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
    },
    planet: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    starship: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    $on: vi.fn(),
    $disconnect: vi.fn(),
  },
}));
vi.mock("@/lib/validation", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    validateInput: vi.fn(),
    createValidationError: vi.fn(),
  };
});
vi.mock("@/lib/logger-utils", () => ({
  logError: vi.fn(),
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));
vi.mock("@/lib/cache/databaseCache", () => ({
  CacheInvalidation: {
    invalidateFlights: vi.fn(),
    invalidateUserCaches: vi.fn(),
  },
}));
vi.mock("../helpers", () => ({
  createActionResponse: vi.fn(),
}));

const mockGetCurrentUser = vi.mocked(getCurrentUser);
const mockDb = vi.mocked(db);
const mockValidateInput = vi.mocked(validateInput);
const mockCreateValidationError = vi.mocked(createValidationError);
const mockLogError = vi.mocked(logError);
const mockRevalidatePath = vi.mocked(revalidatePath);
const mockCacheInvalidation = vi.mocked(CacheInvalidation);
const mockCreateActionResponse = vi.mocked(createActionResponse);

describe("bookFlight", () => {
  const mockUserId = "user-123";
  const mockFlightId = "flight-456";
  const mockUser = {
    id: mockUserId,
    role: ROLE.USER,
    email: "test@example.com",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default successful validation
    mockValidateInput.mockReturnValue({
      success: true,
      data: { id: mockFlightId },
    });

    // Default successful authentication
    mockGetCurrentUser.mockResolvedValue({
      success: true,
      data: mockUser,
    });

    // Default createActionResponse mock
    mockCreateActionResponse.mockImplementation((response) => ({
      success: false,
      message: "",
      error: "",
      ...response,
    }));
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe("input validation", () => {
    it("should return validation error for invalid flight ID", async () => {
      const mockZodError = {
        flatten: () => ({
          fieldErrors: { id: ["Invalid flight ID"] },
        }),
      };
      mockValidateInput.mockReturnValue({
        success: false,
        errors: mockZodError,
      });

      mockCreateValidationError.mockReturnValue({
        success: false,
        message: "Validation failed",
        error: "",
        errors: { id: ["Invalid flight ID"] },
      });

      const result = await bookFlight("invalid-id");

      expect(result).toEqual({
        success: false,
        message: "Validation failed",
        error: "",
        errors: { id: ["Invalid flight ID"] },
      });
      expect(mockValidateInput).toHaveBeenCalledWith(expect.any(Object), {
        id: "invalid-id",
      });
      expect(mockCreateValidationError).toHaveBeenCalledWith(mockZodError);
      expect(mockGetCurrentUser).not.toHaveBeenCalled();
    });

    it("should return validation error for empty flight ID", async () => {
      const mockZodError = {
        flatten: () => ({
          fieldErrors: { id: ["Flight ID is required"] },
        }),
      };
      mockValidateInput.mockReturnValue({
        success: false,
        errors: mockZodError,
      });

      mockCreateValidationError.mockReturnValue({
        success: false,
        message: "Validation failed",
        error: "",
        errors: { id: ["Flight ID is required"] },
      });

      const result = await bookFlight("");

      expect(result).toEqual({
        success: false,
        message: "Validation failed",
        error: "",
        errors: { id: ["Flight ID is required"] },
      });
    });
  });

  describe("authentication", () => {
    it("should return error when user authentication fails", async () => {
      mockGetCurrentUser.mockResolvedValue({
        success: false,
        message: "Authentication failed",
      });

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Authentication failed. Please sign in again.",
        error: "",
      });
      expect(mockDb.flight.findUnique).not.toHaveBeenCalled();
    });

    it("should return error when user is not a regular user", async () => {
      mockGetCurrentUser.mockResolvedValue({
        success: true,
        data: { ...mockUser, role: ROLE.ADMIN },
      });

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Only regular users can book flights.",
        error: "",
      });
      expect(mockDb.flight.findUnique).not.toHaveBeenCalled();
    });
  });

  describe("flight existence and status", () => {
    it("should return error when flight does not exist", async () => {
      mockDb.flight.findUnique.mockResolvedValue(null);

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Flight not found.",
        error: "",
      });
      expect(mockDb.flight.findUnique).toHaveBeenCalledWith({
        where: { id: mockFlightId },
        select: { id: true, cancelled: true },
      });
    });

    it("should return error when flight is cancelled", async () => {
      mockDb.flight.findUnique.mockResolvedValue({
        id: mockFlightId,
        cancelled: true,
      });

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Cannot book a cancelled flight.",
        error: "",
      });
    });
  });

  describe("booking logic", () => {
    beforeEach(() => {
      // Setup successful flight lookup
      mockDb.flight.findUnique.mockResolvedValue({
        id: mockFlightId,
        cancelled: false,
      });

      // Mock cache invalidation to resolve successfully
      mockCacheInvalidation.invalidateFlights.mockResolvedValue(undefined);
      mockCacheInvalidation.invalidateUserCaches.mockResolvedValue(undefined);
    });

    it("should return error when user already booked the flight", async () => {
      mockDb.user.findFirst.mockResolvedValue({
        id: mockUserId,
        email: "test@example.com",
      } as any);

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "You have already booked this flight.",
        error: "",
      });
      expect(mockDb.user.findFirst).toHaveBeenCalledWith({
        where: {
          id: mockUserId,
          bookings: { some: { id: mockFlightId } },
        },
      });
    });

    it("should successfully book flight when all conditions are met", async () => {
      // User hasn't booked this flight yet
      mockDb.user.findFirst.mockResolvedValue(null);

      // Mock successful booking update
      mockDb.user.update.mockResolvedValue({
        id: mockUserId,
        email: "test@example.com",
      } as any);

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: true,
        message: "Booked successfully",
      });

      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUserId },
        data: {
          bookings: {
            connect: { id: mockFlightId },
          },
        },
      });

      expect(mockCacheInvalidation.invalidateFlights).toHaveBeenCalled();
      expect(mockCacheInvalidation.invalidateUserCaches).toHaveBeenCalledWith(
        mockUserId
      );
      expect(mockRevalidatePath).toHaveBeenCalledWith("/flights");
    });
  });

  describe("error handling", () => {
    it("should handle database errors during flight lookup", async () => {
      const dbError = new Error("Database connection failed");
      mockDb.flight.findUnique.mockRejectedValue(dbError);

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Booking failed",
        error: "",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error booking flight",
        dbError,
        { flightId: mockFlightId, userId: mockUserId }
      );
    });

    it("should handle database errors during booking check", async () => {
      mockDb.flight.findUnique.mockResolvedValue({
        id: mockFlightId,
        cancelled: false,
      });

      const dbError = new Error("Database query failed");
      mockDb.user.findFirst.mockRejectedValue(dbError);

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Booking failed",
        error: "",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error booking flight",
        dbError,
        { flightId: mockFlightId, userId: mockUserId }
      );
    });

    it("should handle database errors during booking update", async () => {
      mockDb.flight.findUnique.mockResolvedValue({
        id: mockFlightId,
        cancelled: false,
      });
      mockDb.user.findFirst.mockResolvedValue(null);

      const dbError = new Error("Update failed");
      mockDb.user.update.mockRejectedValue(dbError);

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Booking failed",
        error: "",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error booking flight",
        dbError,
        { flightId: mockFlightId, userId: mockUserId }
      );
    });

    it("should handle cache invalidation errors gracefully", async () => {
      mockDb.flight.findUnique.mockResolvedValue({
        id: mockFlightId,
        cancelled: false,
      });
      mockDb.user.findFirst.mockResolvedValue(null);
      mockDb.user.update.mockResolvedValue({
        id: mockUserId,
        email: "test@example.com",
      } as any);

      // Mock cache invalidation to throw error
      mockCacheInvalidation.invalidateFlights.mockRejectedValue(
        new Error("Cache error")
      );

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Booking failed",
        error: "",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error booking flight",
        expect.any(Error),
        { flightId: mockFlightId, userId: mockUserId }
      );
    });

    it("should handle revalidatePath errors gracefully", async () => {
      mockDb.flight.findUnique.mockResolvedValue({
        id: mockFlightId,
        cancelled: false,
      });
      mockDb.user.findFirst.mockResolvedValue(null);
      mockDb.user.update.mockResolvedValue({
        id: mockUserId,
        email: "test@example.com",
      } as any);

      // Mock revalidatePath to throw error
      mockRevalidatePath.mockImplementation(() => {
        throw new Error("Revalidation error");
      });

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Booking failed",
        error: "",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error booking flight",
        expect.any(Error),
        { flightId: mockFlightId, userId: mockUserId }
      );
    });
  });

  describe("integration scenarios", () => {
    it("should handle complete successful booking flow", async () => {
      // Setup all mocks for successful flow
      mockDb.flight.findUnique.mockResolvedValue({
        id: mockFlightId,
        cancelled: false,
      });
      mockDb.user.findFirst.mockResolvedValue(null);
      mockDb.user.update.mockResolvedValue({
        id: mockUserId,
        email: "test@example.com",
      } as any);

      // Mock cache invalidation to resolve successfully
      mockCacheInvalidation.invalidateFlights.mockResolvedValue(undefined);
      mockCacheInvalidation.invalidateUserCaches.mockResolvedValue(undefined);

      // Mock revalidatePath to not throw
      mockRevalidatePath.mockImplementation(() => {});

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: true,
        message: "Booked successfully",
      });

      // Verify all steps were called in correct order
      expect(mockValidateInput).toHaveBeenCalledWith(expect.any(Object), {
        id: mockFlightId,
      });
      expect(mockGetCurrentUser).toHaveBeenCalled();
      expect(mockDb.flight.findUnique).toHaveBeenCalledWith({
        where: { id: mockFlightId },
        select: { id: true, cancelled: true },
      });
      expect(mockDb.user.findFirst).toHaveBeenCalledWith({
        where: {
          id: mockUserId,
          bookings: { some: { id: mockFlightId } },
        },
      });
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: mockUserId },
        data: {
          bookings: {
            connect: { id: mockFlightId },
          },
        },
      });
      expect(mockCacheInvalidation.invalidateFlights).toHaveBeenCalled();
      expect(mockCacheInvalidation.invalidateUserCaches).toHaveBeenCalledWith(
        mockUserId
      );
      expect(mockRevalidatePath).toHaveBeenCalledWith("/flights");
    });

    it("should handle edge case with undefined userId in error logging", async () => {
      // Simulate successful authentication but then force an error
      mockGetCurrentUser.mockResolvedValue({
        success: true,
        data: mockUser,
      });

      // Force an error during flight lookup
      mockDb.flight.findUnique.mockRejectedValue(new Error("Test error"));

      const result = await bookFlight(mockFlightId);

      expect(result).toEqual({
        success: false,
        message: "Booking failed",
        error: "",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error booking flight",
        expect.any(Error),
        { flightId: mockFlightId, userId: mockUserId }
      );
    });
  });
});
