import Image from "next/image";
import { planetsData } from "../planetsData";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import type { Metadata } from "next";
interface PlanetPageProps {
  params: Promise<{ planetId: string }>;
}

export async function generateStaticParams() {
  return planetsData.map((planet) => ({
    planetId: planet.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlanetPageProps): Promise<Metadata> {
  const { planetId } = await params;
  const planet = planetsData.find((p) => p.slug === planetId);

  if (!planet) {
    return {
      title: "Planet Not Found",
      description: "The requested planet could not be found.",
    };
  }

  return {
    title: planet.name,
    description: `${planet.shortDescription} Discover more about ${planet.name}'s climate, spaceport, and unique features. Book your flight to ${planet.name} today!`,
    keywords: [
      planet.name,
      planet.climate,
      "space travel",
      "intergalactic",
      "planet",
      "destination",
      "starships",
    ],
    openGraph: {
      title: `${planet.name} - Stars Travel`,
      description: `${planet.shortDescription} Discover more about ${planet.name}'s climate, spaceport, and unique features. Book your flight to ${planet.name} today!`,
      url: `/planets/${planet.slug}`,
      images: [
        {
          url: planet.img,
          width: 400,
          height: 400,
          alt: `${planet.name} - Intergalactic destination`,
        },
      ],
    },
    twitter: {
      title: `${planet.name} - Stars Travel`,
      description: `${planet.shortDescription} Discover more about ${planet.name}'s climate, spaceport, and unique features. Book your flight to ${planet.name} today!`,
      images: [planet.img],
    },
  };
}

export default async function PlanetPage({ params }: PlanetPageProps) {
  const { planetId } = await params;
  const planet = planetsData.find((p) => p.slug === planetId);

  if (!planet) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageSection}>
        <h1 className={styles.heading}>{planet.name}</h1>
        <p className={styles.shortDesc}>{planet.shortDescription}</p>
        <Image
          src={planet.img}
          width={400}
          height={400}
          alt={`${planet.name} image`}
        />
      </div>
      <div className={styles.pageSection}>
        <h2 className={styles.subHeading}>Planet overview</h2>
        <section className={styles.overview}>
          <p>
            <span className={styles.bold}>Climate:</span> {planet.climate}
          </p>
          <p>{planet.description}</p>
        </section>
        <section>
          <h2 className={styles.subHeading}>Main Spaceport</h2>
          <p className={styles.spacePortInfo}>{planet.spacePortInfo}</p>
        </section>
        <section className={styles.funFact}>
          <h2 className={styles.subHeading}>Fun Fact</h2>
          {planet.funFact}
        </section>
      </div>
    </div>
  );
}
