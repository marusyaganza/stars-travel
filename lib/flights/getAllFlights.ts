import { Prisma } from "@prisma/client";
import { db } from "../db";
import { FlightResult } from "@/types/flight";
import { logError } from "@/lib/logger-utils";
import { SecureCache, CACHE_CONFIG, CacheKeys } from "@/lib/cache/secureCache";

const flightSelect = Prisma.validator<Prisma.FlightSelect>()({
  id: true,
  date: true,
  cancelled: true,
  logo: true,
  origin: {
    select: {
      id: true,
      name: true,
    },
  },
  destination: {
    select: {
      id: true,
      name: true,
    },
  },
  starship: {
    select: {
      id: true,
      name: true,
    },
  },
});

export type GetAllFlightsResult = {
  success: boolean;
  data?: FlightResult[];
  error?: string;
};

export async function getAllFlights(
  filter?: object
): Promise<GetAllFlightsResult> {
  const cacheKey = CacheKeys.flights.all(filter);

  const result = await SecureCache.cachePublic(
    cacheKey,
    async () => {
      const flights = await db.flight.findMany({
        where: filter,
        select: flightSelect,
        orderBy: {
          date: "desc",
        },
      });

      const currentDate = new Date();

      return flights.map((flight) => ({
        ...flight,
        archived: flight.date < currentDate,
      }));
    },
    {
      ttl: CACHE_CONFIG.FLIGHTS.ALL_FLIGHTS,
    }
  );

  if (!result.success) {
    await logError("Error fetching all flights", new Error(result.error), {
      filter,
    });
    return {
      success: false,
      error: "Failed to load flights. Please try again later.",
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

export async function getCurrentFlights(
  filter?: object
): Promise<GetAllFlightsResult> {
  const cacheKey = CacheKeys.flights.current(filter);

  const result = await SecureCache.cachePublic(
    cacheKey,
    async () => {
      const currentDate = new Date();
      return await db.flight.findMany({
        where: { ...filter, date: { gte: currentDate }, cancelled: false },
        select: flightSelect,
        orderBy: {
          date: "asc",
        },
      });
    },
    {
      ttl: CACHE_CONFIG.FLIGHTS.CURRENT_FLIGHTS,
    }
  );

  if (!result.success) {
    await logError("Error fetching current flights", new Error(result.error), {
      filter,
    });
    return {
      success: false,
      error: "Failed to load current flights. Please try again later.",
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
