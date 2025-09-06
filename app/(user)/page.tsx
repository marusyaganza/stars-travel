import { Banner } from "@/components/Banner/Banner";
import styles from "./page.module.css";
import { Destinations } from "@/components/Destinations";
import { Starships } from "@/components/Starships";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Stars Travel! Discover amazing destinations across the galaxy, explore our fleet of starships, and book your next intergalactic adventure.",
  openGraph: {
    title: "Stars Travel - Your Gateway to the Galaxy",
    description:
      "Welcome to Stars Travel! Discover amazing destinations across the galaxy, explore our fleet of starships, and book your next intergalactic adventure.",
    url: "/",
    images: [
      {
        url: "/img/logo.png",
        width: 1200,
        height: 630,
        alt: "Stars Travel - Intergalactic Space Travel",
      },
    ],
  },
  twitter: {
    title: "Stars Travel - Your Gateway to the Galaxy",
    description:
      "Welcome to Stars Travel! Discover amazing destinations across the galaxy, explore our fleet of starships, and book your next intergalactic adventure.",
    images: ["/img/logo.png"],
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <ErrorBoundary>
        <Banner />
      </ErrorBoundary>
      <section>
        <h2 className={styles.subHeading}>Featured Destinations</h2>
        <ErrorBoundary>
          <Destinations />
        </ErrorBoundary>
      </section>

      <section>
        <h2 className={styles.subHeading}>Fly in Style</h2>
        <ErrorBoundary>
          <Starships />
        </ErrorBoundary>
      </section>
    </div>
  );
}
