import { starships } from "@/data/starwars/starships";

export const starshipOptions = starships
  .map((starship) => ({
    text: starship.name,
    value: starship.name,
  }))
  .sort((a, b) => a.text.localeCompare(b.text));
