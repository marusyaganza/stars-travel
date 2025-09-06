import { Suspense } from "react";
import { Spinner } from "@/components/Spinner/Spinner";
import { ProfileFlightSection } from "./ProfileFlightSection";
import { getPastFlightsForUser } from "@/lib/flights/flightUtils";

interface PastFlightsSectionProps {
  isAdmin: boolean;
}

async function PastFlightsContent({ isAdmin }: PastFlightsSectionProps) {
  const { flights } = await getPastFlightsForUser();

  if (!flights) {
    return null;
  }

  return (
    <ProfileFlightSection
      flights={flights}
      isAdmin={isAdmin}
      flightType="past"
    />
  );
}

export function PastFlightsSection({ isAdmin }: PastFlightsSectionProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <PastFlightsContent isAdmin={isAdmin} />
    </Suspense>
  );
}
