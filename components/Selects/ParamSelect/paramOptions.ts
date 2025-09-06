import { planets } from "@/data/starwars/planets";

export const paramOptions = planets
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((planet) => ({
    text: planet.name,
    value: planet.slug,
  }));
