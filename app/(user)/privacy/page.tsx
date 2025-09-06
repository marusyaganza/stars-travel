import { Spinner } from "@/components/Spinner/Spinner";
import { Suspense } from "react";
import styles from "./page.module.css";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Learn about how Stars Travel handles your data and privacy. This is a personal, experimental project for learning and demonstration purposes.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Notice - Stars Travel",
    description:
      "Learn about how Stars Travel handles your data and privacy. This is a personal, experimental project for learning and demonstration purposes.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy Notice - Stars Travel",
    description:
      "Learn about how Stars Travel handles your data and privacy. This is a personal, experimental project for learning and demonstration purposes.",
  },
};

function PrivacyContent() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Privacy Notice</h1>
      <div className={styles.disclaimer}>
        <p>
          <span className={styles.warning}>Privacy Notice:</span> This is a
          personal, experimental project for learning and demonstration
          purposes.
        </p>
        <p>
          Chat histories, feedback, and evaluation data may be shared with
          OpenAI&apos;s API for model improvement.
          <span className={styles.consent}>
            {" "}
            By using this app, you acknowledge and consent to this data sharing.
          </span>
        </p>
        <p>
          <span className={styles.warning}>
            Please avoid submitting sensitive or personal information.
          </span>
        </p>
        <p>
          Data is stored locally and/or in a database solely for app
          functionality. No commercial guarantees or warranties apply.
        </p>
      </div>
    </div>
  );
}

export default function Privacy() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <PrivacyContent />
      </Suspense>
    </ErrorBoundary>
  );
}
