import { z } from "zod";
import { stringSchema, dateSchema, optionalStringSchema } from "./common";

export const FlightCreateSchema = z.object({
  origin: stringSchema.min(2, "Origin must be at least 2 characters"),
  destination: stringSchema.min(2, "Destination must be at least 2 characters"),
  starship: stringSchema.min(2, "Starship must be at least 2 characters"),
  date: dateSchema,
  logo: optionalStringSchema,
});

export const FlightIdSchema = z.object({
  id: z.string().cuid("Invalid flight ID"),
});

export type FlightCreateInput = z.infer<typeof FlightCreateSchema>;
export type FlightIdInput = z.infer<typeof FlightIdSchema>;
