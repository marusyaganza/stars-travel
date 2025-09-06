import { FlightsTable } from "@/components/FlightTable/FlightTable";
import styles from "./page.module.css";
import { getAllFlights } from "@/lib/flights/getAllFlights";
import { Suspense } from "react";
import { Spinner } from "@/components/Spinner/Spinner";
import { getCurrentUser } from "@/lib/auth/user";
import { ROLE } from "@prisma/client";
import Link from "next/link";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { logError } from "@/lib/logger-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galactic Flight Search",
  description:
    "Find and book your next intergalactic journey. Search through our comprehensive database of flights to planets across the galaxy.",
  keywords: [
    "flights",
    "space travel",
    "intergalactic",
    "booking",
    "galaxy",
    "planets",
    "starships",
  ],
  openGraph: {
    title: "Galactic Flight Search - Stars Travel",
    description:
      "Find and book your next intergalactic journey. Search through our comprehensive database of flights to planets across the galaxy.",
    url: "/flights",
  },
  twitter: {
    title: "Galactic Flight Search - Stars Travel",
    description:
      "Find and book your next intergalactic journey. Search through our comprehensive database of flights to planets across the galaxy.",
  },
};

async function FlightTableComponent() {
  const userResult = await getCurrentUser();
  const flightsResult = await getAllFlights();

  if (
    !userResult.success &&
    userResult.error &&
    userResult.error !== "User not authenticated. Please sign in again."
  ) {
    await logError(
      "User data error in FlightTableComponent",
      new Error(userResult.error),
      {
        component: "FlightTableComponent",
        page: "flights",
      }
    );
  }

  // Handle flights data errors
  if (!flightsResult.success && flightsResult.error) {
    await logError(
      "Flights data error in FlightTableComponent",
      new Error(flightsResult.error),
      {
        component: "FlightTableComponent",
        page: "flights",
      }
    );
  }

  if (!flightsResult.data) {
    return null;
  }

  const flights = flightsResult.data;

  let action: "Book" | undefined = undefined;
  let bookings: string[] = [];

  if (userResult.success && userResult.data) {
    const user = userResult.data;
    bookings =
      user.bookings?.map((booking: { id: string }) => booking.id) || [];
    const isUser = user.role === ROLE.USER;
    action = isUser ? "Book" : undefined;
  }

  return <FlightsTable action={action} flights={flights} bookings={bookings} />;
}

async function ScheduleButton() {
  const userResult = await getCurrentUser();

  if (userResult.error) {
    await logError(
      "User data error in ScheduleButton",
      new Error(userResult.error),
      {
        component: "ScheduleButton",
        page: "flights",
      }
    );
  }

  if (!userResult.success || !userResult.data) {
    return null;
  }

  const user = userResult.data;
  if (user.role === ROLE.ADMIN) {
    return (
      <Link className={styles.scheduleButton} href="/flights/new">
        Schedule new flight
      </Link>
    );
  }
}

export default function Flights() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Galactic Flight Search</h1>
      <h2 className={styles.subHeading}>
        Find your next intergalactic journey
      </h2>
      <ErrorBoundary>
        <Suspense>
          <ScheduleButton />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <FlightTableComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
