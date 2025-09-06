import { FlightsTable } from "@/components/FlightTable/FlightTable";
import { FlightResult } from "@/types/flight";
import Link from "next/link";
import styles from "./ProfileFlightSection.module.css";

interface ProfileFlightSectionProps {
  flights: FlightResult[] | null;
  isAdmin: boolean;
  flightType: "current" | "past";
}

export function ProfileFlightSection({
  flights,
  isAdmin,
  flightType,
}: ProfileFlightSectionProps) {
  if (!flights || flights.length === 0) {
    if (flightType === "current") {
      return (
        <>
          <h2 className={styles.subHeading}>
            {isAdmin
              ? "Current Flights I Created"
              : "My Current Flight Bookings"}
          </h2>
          <p className={styles.noFlights}>
            No flights found
            <Link
              className={styles.link}
              href={isAdmin ? "/flights/new" : "/flights"}
            >
              {isAdmin ? "Create one" : "Book one"}
            </Link>
          </p>
        </>
      );
    }
    return null;
  }

  const heading = isAdmin
    ? flightType === "current"
      ? "Current Flights I Created"
      : "Past Flights I Created"
    : flightType === "current"
    ? "My Current Flight Bookings"
    : "My Past Flight Bookings";

  return (
    <>
      <h2 className={styles.subHeading}>{heading}</h2>
      <FlightsTable
        action={flightType === "current" && !isAdmin ? "Cancel" : undefined}
        flights={flights}
        withAction={flightType === "past" ? false : undefined}
      />
    </>
  );
}
