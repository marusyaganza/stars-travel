import { FlightForm } from "@/components/FlightForm/FlightForm";
import styles from "./page.module.css";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule New Flight",
  description:
    "Schedule a new intergalactic flight for your space travel service. Add departure and arrival details, select starships, and set flight schedules.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Schedule New Flight - Stars Travel",
    description:
      "Schedule a new intergalactic flight for your space travel service. Add departure and arrival details, select starships, and set flight schedules.",
    url: "/flights/new",
  },
  twitter: {
    title: "Schedule New Flight - Stars Travel",
    description:
      "Schedule a new intergalactic flight for your space travel service. Add departure and arrival details, select starships, and set flight schedules.",
  },
};

export default function NewFlight() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Schedule flight</h1>
      <ErrorBoundary>
        <FlightForm />
      </ErrorBoundary>
    </div>
  );
}
