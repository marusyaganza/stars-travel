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

export async function cancelBooking(flightId: string): Promise<ActionResponse> {
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
    if (userData.role !== ROLE.USER) {
      return createActionResponse({
        message: "Only regular users can cancel bookings.",
      });
    }

    // Check if user has booked this flight
    const existingBooking = await db.user.findFirst({
      where: {
        id: userData.id,
        bookings: { some: { id: flightId } },
      },
    });

    if (!existingBooking) {
      return createActionResponse({
        message: "You have not booked this flight.",
      });
    }

    await db.user.update({
      where: { id: userData.id },
      data: {
        bookings: {
          disconnect: { id: flightId },
        },
      },
    });

    await db.flight.update({
      where: { id: flightId },
      data: {
        bookedBy: {
          disconnect: { id: userData.id },
        },
      },
    });

    revalidatePath("/profile");
    return { success: true, message: "Booking cancelled successfully" };
  } catch (err) {
    await logError("Error cancelling flight booking", err, { flightId });
    return createActionResponse({
      message: "Failed to cancel booking. Please try again later.",
    });
  }
}
