import { getSession } from "../auth/session";
import { db } from "../db";
import { FlightResult } from "@/types/flight";
import { Prisma } from "@prisma/client";
import { logError } from "@/lib/logger-utils";

type FlightWithRelations = {
  logo: string | null;
  id: string;
  date: Date;
  cancelled: boolean;
  origin: {
    id: string;
    name: string;
  };
  destination: {
    id: string;
    name: string;
  };
  starship: {
    id: string;
    name: string;
  };
};

export type GetFlightsByUserResult = {
  success: boolean;
  data?: FlightResult[];
  error?: string;
};

const flightSelect = {
  logo: true,
  id: true,
  date: true,
  cancelled: true,
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
};

export async function getFlightsByUser(
  type: "past" | "current" = "current"
): Promise<GetFlightsByUserResult> {
  try {
    const sessionData = await getSession();
    if (!sessionData?.userId) {
      return {
        success: false,
        error: "User not authenticated. Please sign in again.",
      };
    }

    const currentDate = new Date();
    const dateFilter: Prisma.FlightWhereInput =
      type === "past"
        ? { date: { lt: currentDate } }
        : { date: { gte: currentDate } };

    const orderBy: Prisma.FlightOrderByWithRelationInput =
      type === "past" ? { date: "desc" } : { date: "asc" };

    const user = await db.user.findUnique({
      where: { id: sessionData.userId },
      include: {
        bookings: {
          where: dateFilter,
          orderBy,
          select: flightSelect,
        },
        createdFlights: {
          where: dateFilter,
          orderBy,
          select: flightSelect,
        },
      },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found. Please try signing in again.",
      };
    }

    const allFlights = [
      ...user.bookings.map((flight: FlightWithRelations) => ({
        ...flight,
        archived: type === "past",
      })),
      ...user.createdFlights.map((flight: FlightWithRelations) => ({
        ...flight,
        archived: type === "past",
      })),
    ];

    const sortedFlights = allFlights.sort((a, b) => {
      if (type === "past") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return {
      success: true,
      data: sortedFlights,
    };
  } catch (error) {
    await logError("Error fetching flights by user", error, { type });
    return {
      success: false,
      error: "Failed to load your flights. Please try again later.",
    };
  }
}
