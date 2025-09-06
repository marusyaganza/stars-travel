import styles from "./page.module.css";
import ImageWithFallback from "@/components/ImageWithFallback/ImageWithFallback";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { logError } from "@/lib/logger-utils";
import { starships } from "@/data/starwars/starships";

const STARSHIP_DATA_CACHE_DURATION = 86400; // 24 hours in seconds

interface StarshipData {
  name: string;
  model: string;
  manufacturer: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  url: string;
}

interface StarshipPageProps {
  params: Promise<{ starshipId: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  try {
    const response = await fetch("https://swapi.info/api/starships", {
      next: { revalidate: STARSHIP_DATA_CACHE_DURATION },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const apiStarships = await response.json();
    return apiStarships.map((starship: StarshipData) => ({
      starshipId: starship.url.split("/").pop(),
    }));
  } catch (error) {
    await logError(
      "Failed to fetch starships from API in generateStaticParams",
      error,
      {
        fallbackUsed: true,
        localStarshipsCount: starships.length,
      }
    );

    // Fallback to local starships data
    return starships.map((starship) => ({
      starshipId: starship.slug,
    }));
  }
}

export async function generateMetadata({
  params,
}: StarshipPageProps): Promise<Metadata> {
  const { starshipId } = await params;

  try {
    const starshipData = await fetch(
      `https://swapi.info/api/starships/${starshipId}`,
      { next: { revalidate: STARSHIP_DATA_CACHE_DURATION } }
    ).then((res) => {
      if (!res?.ok) {
        throw new Error("Starship not found");
      }
      return res.json();
    });

    return {
      title: starshipData.name,
      description: `Explore the ${starshipData.name} - a ${starshipData.starship_class} manufactured by ${starshipData.manufacturer}. View detailed technical specifications, capacity, and performance data for this iconic starship.`,
      keywords: [
        starshipData.name,
        starshipData.model,
        starshipData.manufacturer,
        starshipData.starship_class,
        "starship",
        "space travel",
        "intergalactic",
        "Star Wars",
        "technical specifications",
      ],
      openGraph: {
        title: `${starshipData.name} - Stars Travel`,
        description: `Explore the ${starshipData.name} - a ${starshipData.starship_class} manufactured by ${starshipData.manufacturer}. View detailed technical specifications, capacity, and performance data for this iconic starship.`,
        url: `/starships/${starshipId}`,
        images: [
          {
            url: `/img/starships/${starshipId}.webp`,
            width: 800,
            height: 400,
            alt: `${starshipData.name} - ${starshipData.starship_class}`,
          },
        ],
      },
      twitter: {
        title: `${starshipData.name} - Stars Travel`,
        description: `Explore the ${starshipData.name} - a ${starshipData.starship_class} manufactured by ${starshipData.manufacturer}. View detailed technical specifications, capacity, and performance data for this iconic starship.`,
        images: [`/img/starships/${starshipId}.webp`],
      },
    };
  } catch {
    return {
      title: "Starship Not Found",
      description: "The requested starship could not be found in our database.",
    };
  }
}

export default async function StarshipPage({
  params,
}: Readonly<StarshipPageProps>) {
  const { starshipId } = await params;
  const starshipData = await fetch(
    `https://swapi.info/api/starships/${starshipId}`,
    { next: { revalidate: STARSHIP_DATA_CACHE_DURATION } }
  ).then((res) => {
    if (!res?.ok) {
      return notFound();
    }
    return res.json();
  });

  const formatNumber = (value: string): string => {
    const num = parseInt(value);
    return num.toLocaleString();
  };

  const formatSpecValue = (key: string, value: string): string => {
    if (key === "cargo_capacity") {
      return `${formatNumber(value)} kg`;
    }
    if (["crew", "passengers"].includes(key)) {
      return formatNumber(value);
    }
    if (key === "length") {
      return `${formatNumber(value)} meters`;
    }
    if (key === "max_atmosphering_speed") {
      return value === "n/a" ? value : `${formatNumber(value)} km/h`;
    }
    return value;
  };

  const getSpecDisplayName = (key: string): string => {
    const displayNames: Record<string, string> = {
      length: "Length",
      max_atmosphering_speed: "Max Speed",
      crew: "Crew",
      passengers: "Passengers",
      cargo_capacity: "Cargo Capacity",
      hyperdrive_rating: "Hyperdrive Rating",
      MGLT: "MGLT Rating",
      starship_class: "Starship Class",
    };
    return displayNames[key] || key;
  };

  const technicalSpecs = [
    "length",
    "max_atmosphering_speed",
    "hyperdrive_rating",
    "MGLT",
    "starship_class",
  ];

  const capacitySpecs = ["crew", "passengers", "cargo_capacity"];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Imperial Fleet Database</h1>
        <p className={styles.subtitle}>Starship Technical Specifications</p>
      </header>

      <div className={styles.starshipCard}>
        <div className={styles.imageContainer}>
          <ImageWithFallback
            src={`/img/starships/${starshipId}.webp`}
            alt={starshipData.name}
            fallbackSrc="/img/starship.webp"
            width={800}
            height={400}
            className={styles.starshipImage}
            priority
          />
        </div>

        <div className={styles.content}>
          <div className={styles.badge}>{starshipData.starship_class}</div>

          <h2 className={styles.starshipName}>{starshipData.name}</h2>

          <div className={styles.manufacturerInfo}>
            <div className={styles.manufacturerLabel}>Manufactured by</div>
            <div className={styles.manufacturerName}>
              {starshipData.manufacturer}
            </div>
            <div
              className={styles.manufacturerLabel}
              style={{ marginTop: "0.5rem" }}
            >
              Model: {starshipData.model}
            </div>
          </div>

          <div className={styles.specsGrid}>
            <div className={styles.specCard}>
              <h3>Technical Specifications</h3>
              {technicalSpecs.map((spec) => (
                <div key={spec}>
                  <div className={styles.specLabel}>
                    {getSpecDisplayName(spec)}
                  </div>
                  <div className={styles.specValue}>
                    {formatSpecValue(
                      spec,
                      starshipData[spec as keyof StarshipData]
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.specCard}>
              <h3>Capacity & Personnel</h3>
              {capacitySpecs.map((spec) => (
                <div key={spec}>
                  <div className={styles.specLabel}>
                    {getSpecDisplayName(spec)}
                  </div>
                  <div className={styles.specValue}>
                    {formatSpecValue(
                      spec,
                      starshipData[spec as keyof StarshipData]
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
