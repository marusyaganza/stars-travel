import { planets } from "@/data/starwars/planets";

export const planetOptions = planets
  .map((planet) => ({
    text: planet.name,
    value: planet.name,
  }))
  .sort((a, b) => a.text.localeCompare(b.text));
