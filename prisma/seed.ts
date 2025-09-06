import { db } from "@/lib/db";
import { planets } from "@/data/starwars/planets";
import { starships } from "@/data/starwars/starships";
import { logError } from "@/lib/logger-utils";

async function main() {
  await db.planet.createMany({
    data: planets,
  });

  await db.starship.createMany({
    data: starships,
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    await logError("Database seeding error", e);
    await db.$disconnect();
    process.exit(1);
  });
