import { Spinner } from "@/components/Spinner/Spinner";
import { Suspense } from "react";
import styles from "./page.module.css";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { getUserProfileData } from "@/lib/hooks/useUserProfile";
import { CurrentFlightsSection } from "@/components/Profile/CurrentFlightsSection";
import { PastFlightsSection } from "@/components/Profile/PastFlightsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Manage your Stars Travel profile, view your current and past intergalactic flights, and track your space travel history.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Profile - Stars Travel",
    description:
      "Manage your Stars Travel profile, view your current and past intergalactic flights, and track your space travel history.",
    url: "/profile",
  },
  twitter: {
    title: "Profile - Stars Travel",
    description:
      "Manage your Stars Travel profile, view your current and past intergalactic flights, and track your space travel history.",
  },
};

async function ProfileContent() {
  const { user, isAdmin } = await getUserProfileData();

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome {user?.name || ""}</h1>
      {user && (
        <>
          <CurrentFlightsSection isAdmin={isAdmin} />
          <PastFlightsSection isAdmin={isAdmin} />
        </>
      )}
    </div>
  );
}

export default function Profile() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <ProfileContent />
      </Suspense>
    </ErrorBoundary>
  );
}
