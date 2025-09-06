import { getFlightsByUser } from "./getFlightsByUser";
import { logError } from "@/lib/logger-utils";
import { FlightResult } from "@/types/flight";

export interface FlightDataResult {
  flights: FlightResult[] | null;
  error: string | null;
}

export async function getCurrentFlightsForUser(): Promise<FlightDataResult> {
  try {
    const flightsResult = await getFlightsByUser("current");

    if (!flightsResult.success && flightsResult.error) {
      await logError(
        "Current flights error in getCurrentFlightsForUser",
        new Error(flightsResult.error),
        {
          utility: "getCurrentFlightsForUser",
          flightType: "current",
        }
      );
    }

    return {
      flights: flightsResult.data || null,
      error: flightsResult.error || null,
    };
  } catch (error) {
    await logError("Unexpected error in getCurrentFlightsForUser", error, {
      utility: "getCurrentFlightsForUser",
      flightType: "current",
    });

    return {
      flights: null,
      error: "Failed to load current flights",
    };
  }
}

export async function getPastFlightsForUser(): Promise<FlightDataResult> {
  try {
    const flightsResult = await getFlightsByUser("past");

    if (!flightsResult.success && flightsResult.error) {
      await logError(
        "Past flights error in getPastFlightsForUser",
        new Error(flightsResult.error),
        {
          utility: "getPastFlightsForUser",
          flightType: "past",
        }
      );
    }

    return {
      flights: flightsResult.data || null,
      error: flightsResult.error || null,
    };
  } catch (error) {
    await logError("Unexpected error in getPastFlightsForUser", error, {
      utility: "getPastFlightsForUser",
      flightType: "past",
    });

    return {
      flights: null,
      error: "Failed to load past flights",
    };
  }
}
