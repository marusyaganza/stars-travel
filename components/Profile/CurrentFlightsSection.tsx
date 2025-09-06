import { Suspense } from "react";
import { Spinner } from "@/components/Spinner/Spinner";
import { ProfileFlightSection } from "./ProfileFlightSection";
import { getCurrentFlightsForUser } from "@/lib/flights/flightUtils";

interface CurrentFlightsSectionProps {
  isAdmin: boolean;
}

async function CurrentFlightsContent({ isAdmin }: CurrentFlightsSectionProps) {
  const { flights } = await getCurrentFlightsForUser();

  if (!flights) {
    return null;
  }

  return (
    <ProfileFlightSection
      flights={flights}
      isAdmin={isAdmin}
      flightType="current"
    />
  );
}

export function CurrentFlightsSection({ isAdmin }: CurrentFlightsSectionProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <CurrentFlightsContent isAdmin={isAdmin} />
    </Suspense>
  );
}
