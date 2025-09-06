import { FlightsTable } from "@/components/FlightTable/FlightTable";
import { Spinner } from "@/components/Spinner/Spinner";
import { Suspense } from "react";
import styles from "./page.module.css";
import { getCurrentFlights } from "@/lib/flights/getAllFlights";
import ParamSelect from "@/components/Selects/ParamSelect/ParamSelect";
import { logError } from "@/lib/logger-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galactic Departures",
  description:
    "View all departing flights from planets across the galaxy. Track your journey across the stars and find the perfect departure time for your intergalactic adventure.",
  keywords: [
    "departures",
    "flights",
    "space travel",
    "intergalactic",
    "galaxy",
    "planets",
    "starships",
  ],
  openGraph: {
    title: "Galactic Departures - Stars Travel",
    description:
      "View all departing flights from planets across the galaxy. Track your journey across the stars and find the perfect departure time for your intergalactic adventure.",
    url: "/flights/departures",
  },
  twitter: {
    title: "Galactic Departures - Stars Travel",
    description:
      "View all departing flights from planets across the galaxy. Track your journey across the stars and find the perfect departure time for your intergalactic adventure.",
  },
};

async function FlightTableComponent({ option }: { option?: string }) {
  const filter = option ? { origin: { slug: option } } : undefined;
  const flightsResult = await getCurrentFlights(filter);

  if (!flightsResult.success && flightsResult.error) {
    await logError(
      "Departures data error in FlightTableComponent",
      new Error(flightsResult.error),
      {
        component: "FlightTableComponent",
        page: "departures",
        filter,
      }
    );
  }

  const flights = flightsResult.data;

  if (!flights || flights?.length === 0) {
    return <p className={styles.noFlights}>No flights found</p>;
  }

  return <FlightsTable withAction={false} flights={flights} />;
}

export default async function Departures({
  searchParams,
}: {
  searchParams: Promise<{ option: string }>;
}) {
  const params = await searchParams;
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Galactic Departures</h1>
      <h2 className={styles.subHeading}>
        Your Journey Across the Stars Awaits.
      </h2>
      <section className={styles.selectPlanet}>
        I am currently on <ParamSelect />
      </section>
      <Suspense fallback={<Spinner />}>
        <FlightTableComponent option={params?.option} />
      </Suspense>
    </div>
  );
}
