import { z } from "zod";
import {
  stringSchema,
  numberSchema,
  integerSchema,
  optionalStringSchema,
} from "./common";

// Starship validation schemas
export const StarshipCreateSchema = z.object({
  name: stringSchema.min(2, "Starship name must be at least 2 characters"),
  model: stringSchema.min(2, "Model must be at least 2 characters"),
  manufacturer: stringSchema.min(
    2,
    "Manufacturer must be at least 2 characters"
  ),
  length: numberSchema.min(0.1, "Length must be greater than 0"),
  max_atmosphering_speed: numberSchema.min(0, "Speed must be non-negative"),
  crew: integerSchema.min(1, "Crew must be at least 1"),
  passengers: integerSchema.min(0, "Passengers must be non-negative"),
  cargo_capacity: numberSchema.min(0, "Cargo capacity must be non-negative"),
  hyperdrive_rating: numberSchema.min(
    0,
    "Hyperdrive rating must be non-negative"
  ),
  MGLT: stringSchema.min(1, "MGLT is required"),
  starship_class: stringSchema.min(
    2,
    "Starship class must be at least 2 characters"
  ),
  slug: stringSchema.regex(
    /^[a-z0-9-]+$/,
    "Slug must contain only lowercase letters, numbers, and hyphens"
  ),
  img: optionalStringSchema,
});

export type StarshipCreateInput = z.infer<typeof StarshipCreateSchema>;
