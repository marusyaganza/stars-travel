import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { getFlightsByUser } from "./getFlightsByUser";
import { getSession } from "../auth/session";
import { db } from "../db";
import { logError } from "@/lib/logger-utils";

// Mock dependencies
vi.mock("../auth/session", () => ({
  getSession: vi.fn(),
}));

vi.mock("../db", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
    },
    $on: vi.fn(),
    $disconnect: vi.fn(),
  },
}));

vi.mock("@/lib/logger-utils", () => ({
  logError: vi.fn(),
}));

const mockGetSession = vi.mocked(getSession);
const mockDb = vi.mocked(db);
const mockLogError = vi.mocked(logError);

describe("getFlightsByUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock current date to ensure consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Authentication failures", () => {
    it("should return error when no session exists", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await getFlightsByUser();

      expect(result).toEqual({
        success: false,
        error: "User not authenticated. Please sign in again.",
      });
      expect(mockDb.user.findUnique).not.toHaveBeenCalled();
    });

    it("should return error when session has no userId", async () => {
      mockGetSession.mockResolvedValue({});

      const result = await getFlightsByUser();

      expect(result).toEqual({
        success: false,
        error: "User not authenticated. Please sign in again.",
      });
      expect(mockDb.user.findUnique).not.toHaveBeenCalled();
    });
  });

  describe("User not found", () => {
    it("should return error when user is not found in database", async () => {
      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(null);

      const result = await getFlightsByUser();

      expect(result).toEqual({
        success: false,
        error: "User not found. Please try signing in again.",
      });
    });
  });

  describe("Current flights (default behavior)", () => {
    it("should fetch current flights with correct date filtering and sorting", async () => {
      const mockUser = {
        id: "user-123",
        bookings: [
          {
            id: "flight-1",
            date: new Date("2024-01-20T10:00:00Z"),
            cancelled: false,
            logo: "logo1.png",
            origin: { id: "origin-1", name: "Tatooine" },
            destination: { id: "dest-1", name: "Alderaan" },
            starship: { id: "ship-1", name: "Millennium Falcon" },
          },
        ],
        createdFlights: [
          {
            id: "flight-2",
            date: new Date("2024-01-25T14:00:00Z"),
            cancelled: false,
            logo: "logo2.png",
            origin: { id: "origin-2", name: "Hoth" },
            destination: { id: "dest-2", name: "Endor" },
            starship: { id: "ship-2", name: "X-Wing" },
          },
        ],
      };

      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getFlightsByUser();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data?.[0].id).toBe("flight-1"); // Earlier date first (ascending)
      expect(result.data?.[1].id).toBe("flight-2");
      expect(result.data?.[0].archived).toBe(false);
      expect(result.data?.[1].archived).toBe(false);

      // Verify database query parameters
      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: "user-123" },
        include: {
          bookings: {
            where: { date: { gte: new Date("2024-01-15T12:00:00Z") } },
            orderBy: { date: "asc" },
            select: expect.any(Object),
          },
          createdFlights: {
            where: { date: { gte: new Date("2024-01-15T12:00:00Z") } },
            orderBy: { date: "asc" },
            select: expect.any(Object),
          },
        },
      });
    });
  });

  describe("Past flights", () => {
    it("should fetch past flights with correct date filtering and sorting", async () => {
      const mockUser = {
        id: "user-123",
        bookings: [
          {
            id: "flight-1",
            date: new Date("2024-01-10T10:00:00Z"),
            cancelled: false,
            logo: "logo1.png",
            origin: { id: "origin-1", name: "Tatooine" },
            destination: { id: "dest-1", name: "Alderaan" },
            starship: { id: "ship-1", name: "Millennium Falcon" },
          },
        ],
        createdFlights: [
          {
            id: "flight-2",
            date: new Date("2024-01-05T14:00:00Z"),
            cancelled: false,
            logo: "logo2.png",
            origin: { id: "origin-2", name: "Hoth" },
            destination: { id: "dest-2", name: "Endor" },
            starship: { id: "ship-2", name: "X-Wing" },
          },
        ],
      };

      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getFlightsByUser("past");

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data?.[0].id).toBe("flight-1"); // More recent date first (descending)
      expect(result.data?.[1].id).toBe("flight-2");
      expect(result.data?.[0].archived).toBe(true);
      expect(result.data?.[1].archived).toBe(true);

      // Verify database query parameters
      expect(mockDb.user.findUnique).toHaveBeenCalledWith({
        where: { id: "user-123" },
        include: {
          bookings: {
            where: { date: { lt: new Date("2024-01-15T12:00:00Z") } },
            orderBy: { date: "desc" },
            select: expect.any(Object),
          },
          createdFlights: {
            where: { date: { lt: new Date("2024-01-15T12:00:00Z") } },
            orderBy: { date: "desc" },
            select: expect.any(Object),
          },
        },
      });
    });
  });

  describe("Flight data transformation", () => {
    it("should correctly transform flight data and combine bookings and created flights", async () => {
      const mockUser = {
        id: "user-123",
        bookings: [
          {
            id: "booking-flight",
            date: new Date("2024-01-20T10:00:00Z"),
            cancelled: false,
            logo: "booking-logo.png",
            origin: { id: "origin-1", name: "Tatooine" },
            destination: { id: "dest-1", name: "Alderaan" },
            starship: { id: "ship-1", name: "Millennium Falcon" },
          },
        ],
        createdFlights: [
          {
            id: "created-flight",
            date: new Date("2024-01-25T14:00:00Z"),
            cancelled: true,
            logo: null,
            origin: { id: "origin-2", name: "Hoth" },
            destination: { id: "dest-2", name: "Endor" },
            starship: { id: "ship-2", name: "X-Wing" },
          },
        ],
      };

      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getFlightsByUser();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);

      // Check booking flight
      const bookingFlight = result.data?.find((f) => f.id === "booking-flight");
      expect(bookingFlight).toEqual({
        id: "booking-flight",
        date: new Date("2024-01-20T10:00:00Z"),
        cancelled: false,
        logo: "booking-logo.png",
        archived: false,
        origin: { id: "origin-1", name: "Tatooine" },
        destination: { id: "dest-1", name: "Alderaan" },
        starship: { id: "ship-1", name: "Millennium Falcon" },
      });

      // Check created flight
      const createdFlight = result.data?.find((f) => f.id === "created-flight");
      expect(createdFlight).toEqual({
        id: "created-flight",
        date: new Date("2024-01-25T14:00:00Z"),
        cancelled: true,
        logo: null,
        archived: false,
        origin: { id: "origin-2", name: "Hoth" },
        destination: { id: "dest-2", name: "Endor" },
        starship: { id: "ship-2", name: "X-Wing" },
      });
    });
  });

  describe("Empty results", () => {
    it("should return empty array when user has no flights", async () => {
      const mockUser = {
        id: "user-123",
        bookings: [],
        createdFlights: [],
      };

      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getFlightsByUser();

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it("should return empty array when user has no current flights", async () => {
      const mockUser = {
        id: "user-123",
        bookings: [], // No current bookings
        createdFlights: [], // No current created flights
      };

      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getFlightsByUser();

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });
  });

  describe("Error handling", () => {
    it("should handle database errors gracefully", async () => {
      const dbError = new Error("Database connection failed");
      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockRejectedValue(dbError);

      const result = await getFlightsByUser();

      expect(result).toEqual({
        success: false,
        error: "Failed to load your flights. Please try again later.",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error fetching flights by user",
        dbError,
        { type: "current" }
      );
    });

    it("should handle database errors for past flights", async () => {
      const dbError = new Error("Database connection failed");
      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockRejectedValue(dbError);

      const result = await getFlightsByUser("past");

      expect(result).toEqual({
        success: false,
        error: "Failed to load your flights. Please try again later.",
      });
      expect(mockLogError).toHaveBeenCalledWith(
        "Error fetching flights by user",
        dbError,
        { type: "past" }
      );
    });
  });

  describe("Flight sorting", () => {
    it("should sort current flights in ascending order by date", async () => {
      const mockUser = {
        id: "user-123",
        bookings: [
          {
            id: "flight-3",
            date: new Date("2024-01-30T10:00:00Z"),
            cancelled: false,
            logo: "logo3.png",
            origin: { id: "origin-3", name: "Dagobah" },
            destination: { id: "dest-3", name: "Bespin" },
            starship: { id: "ship-3", name: "TIE Fighter" },
          },
          {
            id: "flight-1",
            date: new Date("2024-01-20T10:00:00Z"),
            cancelled: false,
            logo: "logo1.png",
            origin: { id: "origin-1", name: "Tatooine" },
            destination: { id: "dest-1", name: "Alderaan" },
            starship: { id: "ship-1", name: "Millennium Falcon" },
          },
        ],
        createdFlights: [
          {
            id: "flight-2",
            date: new Date("2024-01-25T14:00:00Z"),
            cancelled: false,
            logo: "logo2.png",
            origin: { id: "origin-2", name: "Hoth" },
            destination: { id: "dest-2", name: "Endor" },
            starship: { id: "ship-2", name: "X-Wing" },
          },
        ],
      };

      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getFlightsByUser();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data?.[0].id).toBe("flight-1"); // Earliest
      expect(result.data?.[1].id).toBe("flight-2"); // Middle
      expect(result.data?.[2].id).toBe("flight-3"); // Latest
    });

    it("should sort past flights in descending order by date", async () => {
      const mockUser = {
        id: "user-123",
        bookings: [
          {
            id: "flight-1",
            date: new Date("2024-01-05T10:00:00Z"),
            cancelled: false,
            logo: "logo1.png",
            origin: { id: "origin-1", name: "Tatooine" },
            destination: { id: "dest-1", name: "Alderaan" },
            starship: { id: "ship-1", name: "Millennium Falcon" },
          },
          {
            id: "flight-3",
            date: new Date("2024-01-12T10:00:00Z"),
            cancelled: false,
            logo: "logo3.png",
            origin: { id: "origin-3", name: "Dagobah" },
            destination: { id: "dest-3", name: "Bespin" },
            starship: { id: "ship-3", name: "TIE Fighter" },
          },
        ],
        createdFlights: [
          {
            id: "flight-2",
            date: new Date("2024-01-08T14:00:00Z"),
            cancelled: false,
            logo: "logo2.png",
            origin: { id: "origin-2", name: "Hoth" },
            destination: { id: "dest-2", name: "Endor" },
            starship: { id: "ship-2", name: "X-Wing" },
          },
        ],
      };

      mockGetSession.mockResolvedValue({ userId: "user-123" });
      mockDb.user.findUnique.mockResolvedValue(mockUser);

      const result = await getFlightsByUser("past");

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data?.[0].id).toBe("flight-3"); // Most recent
      expect(result.data?.[1].id).toBe("flight-2"); // Middle
      expect(result.data?.[2].id).toBe("flight-1"); // Oldest
    });
  });
});
