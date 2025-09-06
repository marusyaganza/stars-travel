import { z } from "zod";
import { stringSchema, optionalStringSchema } from "./common";

export const PlanetCreateSchema = z.object({
  name: stringSchema.min(2, "Planet name must be at least 2 characters"),
  terrain: stringSchema.min(2, "Terrain must be at least 2 characters"),
  climate: stringSchema.min(2, "Climate must be at least 2 characters"),
  slug: stringSchema.regex(
    /^[a-z0-9-]+$/,
    "Slug must contain only lowercase letters, numbers, and hyphens"
  ),
  img: optionalStringSchema,
});

export type PlanetCreateInput = z.infer<typeof PlanetCreateSchema>;
