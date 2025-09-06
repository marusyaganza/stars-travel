import { FlightsTable } from "@/components/FlightTable/FlightTable";
import { Spinner } from "@/components/Spinner/Spinner";
import { Suspense } from "react";
import styles from "./page.module.css";
import { getCurrentFlights } from "@/lib/flights/getAllFlights";
import ParamSelect from "@/components/Selects/ParamSelect/ParamSelect";
import { logError } from "@/lib/logger-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galactic Arrivals",
  description:
    "Track incoming flights and arrivals to planets across the galaxy. Monitor your destination and see when travelers are arriving at your chosen planet.",
  keywords: [
    "arrivals",
    "flights",
    "space travel",
    "intergalactic",
    "galaxy",
    "planets",
    "starships",
    "tracking",
  ],
  openGraph: {
    title: "Galactic Arrivals - Stars Travel",
    description:
      "Track incoming flights and arrivals to planets across the galaxy. Monitor your destination and see when travelers are arriving at your chosen planet.",
    url: "/flights/arrivals",
  },
  twitter: {
    title: "Galactic Arrivals - Stars Travel",
    description:
      "Track incoming flights and arrivals to planets across the galaxy. Monitor your destination and see when travelers are arriving at your chosen planet.",
  },
};

async function FlightTableComponent({ option }: { option?: string }) {
  const filter = option ? { destination: { slug: option } } : undefined;
  const flightsResult = await getCurrentFlights(filter);

  if (!flightsResult.success && flightsResult.error) {
    await logError(
      "Arrivals data error in FlightTableComponent",
      new Error(flightsResult.error),
      {
        component: "FlightTableComponent",
        page: "arrivals",
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

export default async function Arrivals({
  searchParams,
}: {
  searchParams: Promise<{ option: string }>;
}) {
  const params = await searchParams;
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Galactic Arrivals</h1>
      <h2 className={styles.subHeading}>
        Track Incoming Flights & Meet Your Travelers
      </h2>
      <section className={styles.selectPlanet}>
        Show arrivals to: <ParamSelect />
      </section>
      <Suspense fallback={<Spinner />}>
        <FlightTableComponent option={params?.option} />
      </Suspense>
    </div>
  );
}
