"use server";
import { ROLE } from "@prisma/client";
import { getCurrentUser } from "../../lib/auth/user";
import { db } from "../../lib/db";
import { ActionResponse } from "@/actions/types";
import { createActionResponse } from "../helpers";
import { logError } from "@/lib/logger-utils";
import { revalidatePath } from "next/cache";
import {
  FlightIdSchema,
  validateInput,
  createValidationError,
} from "@/lib/validation";
import { CacheInvalidation } from "@/lib/cache/databaseCache";

export async function bookFlight(flightId: string): Promise<ActionResponse> {
  let userId: string | undefined;

  try {
    // Validate input
    const validationResult = validateInput(FlightIdSchema, { id: flightId });
    if (!validationResult.success) {
      return createValidationError(validationResult.errors);
    }

    const userResult = await getCurrentUser();

    if (!userResult.success) {
      return createActionResponse({
        message: "Authentication failed. Please sign in again.",
      });
    }

    const userData = userResult.data!;
    userId = userData.id;

    if (userData.role !== ROLE.USER) {
      return createActionResponse({
        message: "Only regular users can book flights.",
      });
    }

    // Check if flight exists and is not cancelled
    const flight = await db.flight.findUnique({
      where: { id: flightId },
      select: { id: true, cancelled: true },
    });

    if (!flight) {
      return createActionResponse({
        message: "Flight not found.",
      });
    }

    if (flight.cancelled) {
      return createActionResponse({
        message: "Cannot book a cancelled flight.",
      });
    }

    // Check if user already booked this flight
    const existingBooking = await db.user.findFirst({
      where: {
        id: userId,
        bookings: { some: { id: flightId } },
      },
    });

    if (existingBooking) {
      return createActionResponse({
        message: "You have already booked this flight.",
      });
    }

    await db.user.update({
      where: { id: userId },
      data: {
        bookings: {
          connect: { id: flightId },
        },
      },
    });

    await CacheInvalidation.invalidateFlights();
    await CacheInvalidation.invalidateUserCaches(userId);

    revalidatePath("/flights");
    return { success: true, message: "Booked successfully" };
  } catch (err) {
    await logError("Error booking flight", err, { flightId, userId });
    return createActionResponse({
      message: "Booking failed",
    });
  }
}
