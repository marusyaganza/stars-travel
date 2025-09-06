"use server";

import { db } from "@/lib/db";
import {
  FlightCreateSchema,
  validateFormData,
  createValidationError,
} from "@/lib/validation";
import { ActionResponse } from "../types";
import { ROLE } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/user";
import { logError } from "@/lib/logger-utils";
import { CacheInvalidation } from "@/lib/cache/databaseCache";

export async function newFlight(formData: FormData): Promise<ActionResponse> {
  try {
    const userResult = await getCurrentUser();

    if (!userResult.success) {
      return {
        success: false,
        message: "Authentication failed. Please sign in again.",
      };
    }

    const userData = userResult.data!;
    if (userData.role !== ROLE.ADMIN) {
      return {
        success: false,
        message: "Only administrators can create flights.",
      };
    }

    // Validate form data using the new validation system
    const validationResult = validateFormData(FlightCreateSchema, formData);

    if (!validationResult.success) {
      return createValidationError(validationResult.errors);
    }

    const validatedData = validationResult.data;

    // Check if origin and destination are different
    if (validatedData.origin === validatedData.destination) {
      return {
        success: false,
        message: "Origin and destination cannot be the same",
        errors: {
          destination: ["Origin and destination cannot be the same"],
        },
      };
    }

    // Verify that the referenced entities exist
    const [originPlanet, destinationPlanet, starship] = await Promise.all([
      db.planet.findUnique({ where: { name: validatedData.origin } }),
      db.planet.findUnique({ where: { name: validatedData.destination } }),
      db.starship.findUnique({ where: { name: validatedData.starship } }),
    ]);

    if (!originPlanet) {
      return {
        success: false,
        message: "Origin planet not found",
        errors: {
          origin: ["Origin planet not found"],
        },
      };
    }

    if (!destinationPlanet) {
      return {
        success: false,
        message: "Destination planet not found",
        errors: {
          destination: ["Destination planet not found"],
        },
      };
    }

    if (!starship) {
      return {
        success: false,
        message: "Starship not found",
        errors: {
          starship: ["Starship not found"],
        },
      };
    }

    await db.flight.create({
      data: {
        origin: {
          connect: { id: originPlanet.id },
        },
        destination: {
          connect: { id: destinationPlanet.id },
        },
        starship: {
          connect: { id: starship.id },
        },
        creator: {
          connect: { id: userData.id },
        },
        date: new Date(validatedData.date),
        logo: validatedData.logo || null,
      },
    });

    await CacheInvalidation.invalidateFlights();

    return {
      success: true,
      message: "Flight created successfully",
    };
  } catch (err) {
    await logError("Error creating new flight", err);
    return {
      success: false,
      message: "Failed to create flight. Please try again later.",
      error: "Failed to create flight",
    };
  }
}
