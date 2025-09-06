import { db } from "@/lib/db";
import { logError } from "@/lib/logger-utils";
import { addDays } from "date-fns";
import bcrypt from "bcrypt";

async function seedAdminUser() {
  const adminEmail = "admin@starstravel.com";
  const existingAdmin = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin1234", 10);
    await db.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Technical Admin",
        role: "ADMIN",
      },
    });
    console.log("✅ Admin user created.");
  } else {
    console.log("ℹ️  Admin user already exists.");
  }
}

async function seedFlights() {
  console.log("🚀 Starting flight seeding...");

  // Get admin user for creating flights
  const adminUser = await db.user.findUnique({
    where: { email: "admin@starstravel.com" },
  });

  if (!adminUser) {
    throw new Error("Admin user not found. Run seedAdminUser first.");
  }

  // Get some planets from the database (using the actual slugs that were seeded)
  const planets = await db.planet.findMany({
    select: { id: true, name: true, slug: true },
  });

  console.log(`📡 Found ${planets.length} planets in database`);

  if (planets.length < 6) {
    throw new Error("Not enough planets in DB to seed flights.");
  }

  // Get some starships from the database
  const starships = await db.starship.findMany({
    select: { id: true, name: true },
  });

  console.log(`🚀 Found ${starships.length} starships in database`);

  if (starships.length === 0) {
    throw new Error("No starships found in DB. Run seed.ts first.");
  }

  // Available logo options from LogoSelect component
  const logoOptions = [
    "/img/empire-logo.png",
    "/img/rebels-logo.jpeg",
    "/img/jedi-logo.png",
  ];

  // Pick 5 unique origin-destination pairs using actual planet names
  const flightPairs = [
    { origin: "Tatooine", destination: "Alderaan" },
    { origin: "Hoth", destination: "Dagobah" },
    { origin: "Bespin", destination: "Endor" },
    { origin: "Alderaan", destination: "Hoth" },
    { origin: "Dagobah", destination: "Tatooine" },
  ];

  // Get planet id by name
  const getPlanetId = (name: string) =>
    planets.find((p) => p.name === name)?.id as string;

  // Get random starship id
  const getRandomStarshipId = () => {
    const randomIndex = Math.floor(Math.random() * starships.length);
    return starships[randomIndex].id;
  };

  // Get logo for flight (cycling through options)
  const getLogoForFlight = (index: number) => {
    return logoOptions[index % logoOptions.length];
  };

  const today = new Date();
  let createdCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < flightPairs.length; i++) {
    const { origin, destination } = flightPairs[i];
    const date = addDays(today, i + 1); // tomorrow, day after, etc.

    const originId = getPlanetId(origin);
    const destinationId = getPlanetId(destination);
    const starshipId = getRandomStarshipId();
    const logo = getLogoForFlight(i);

    if (!originId || !destinationId) {
      console.log(
        `⚠️  Skipping flight: Planet not found for ${origin} or ${destination}`
      );
      skippedCount++;
      continue;
    }

    // Check if flight already exists (by origin, destination, date)
    const existing = await db.flight.findFirst({
      where: {
        originId: originId,
        destinationId: destinationId,
        date: date,
      },
    });

    if (!existing) {
      try {
        await db.flight.create({
          data: {
            originId: originId,
            destinationId: destinationId,
            date: date,
            starshipId: starshipId,
            creatorId: adminUser.id,
            cancelled: false,
            logo: logo,
          },
        });
        console.log(
          `✅ Flight seeded: ${origin} -> ${destination} on ${
            date.toISOString().split("T")[0]
          } with logo: ${logo.split("/").pop()}`
        );
        createdCount++;
      } catch (error) {
        console.error(
          `❌ Error creating flight ${origin} -> ${destination}:`,
          error
        );
        skippedCount++;
      }
    } else {
      console.log(
        `ℹ️  Flight already exists: ${origin} -> ${destination} on ${
          date.toISOString().split("T")[0]
        }`
      );
      skippedCount++;
    }
  }

  console.log(
    `🎉 Flight seeding completed! Created: ${createdCount}, Skipped: ${skippedCount}`
  );
}

async function main() {
  try {
    console.log("🌱 Starting database seeding...");
    await seedAdminUser();
    await seedFlights();
    console.log("✅ All seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    await logError("Database seeding error (flights)", e);
    await db.$disconnect();
    process.exit(1);
  });
