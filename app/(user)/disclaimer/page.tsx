import { Spinner } from "@/components/Spinner/Spinner";
import { Suspense } from "react";
import styles from "./page.module.css";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Disclaimers",
  description:
    "Important legal information and disclaimers for Stars Travel. This is a fan-made, non-commercial demo project for learning and demonstration purposes.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Legal & Disclaimers - Stars Travel",
    description:
      "Important legal information and disclaimers for Stars Travel. This is a fan-made, non-commercial demo project for learning and demonstration purposes.",
    url: "/disclaimer",
  },
  twitter: {
    title: "Legal & Disclaimers - Stars Travel",
    description:
      "Important legal information and disclaimers for Stars Travel. This is a fan-made, non-commercial demo project for learning and demonstration purposes.",
  },
};

function DisclaimerContent() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Legal & Disclaimers</h1>

      <div className={styles.section}>
        <h3>Project Nature</h3>
        <p>
          <span className={styles.warning}>
            This is a fan-made, non-commercial demo project
          </span>{" "}
          created for learning, experimentation, and demonstration purposes
          only. This application is not affiliated with, endorsed by, or
          connected to any official Star Wars entities.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Intellectual Property</h3>
        <p>
          <span className={styles.copyright}>
            Star Wars and all related properties are © Lucasfilm Ltd.
          </span>
          All Star Wars characters, names, and related elements are trademarks
          of and © Lucasfilm Ltd. and/or its affiliates. This project is created
          under fair use for educational and non-commercial purposes.
        </p>
        <p>
          This application uses publicly available Star Wars data and imagery
          for demonstration purposes only. No claim is made to any official Star
          Wars intellectual property.
        </p>
      </div>

      <div className={styles.section}>
        <h3>No Warranty</h3>
        <p>
          <span className={styles.warning}>
            This application is provided &quot;as is&quot; without any
            warranties.
          </span>
          We make no representations or warranties of any kind, express or
          implied, about the completeness, accuracy, reliability, suitability,
          or availability of the application or its content.
        </p>
        <p>
          No commercial guarantees or warranties apply. Use of this application
          is at your own risk.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Limitation of Liability</h3>
        <p>
          In no event shall the creators of this application be liable for any
          direct, indirect, incidental, special, consequential, or punitive
          damages, including without limitation, loss of profits, data, use,
          goodwill, or other intangible losses, resulting from your use of this
          application.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Third-Party Services</h3>
        <p>
          This application may integrate with third-party services and APIs. We
          are not responsible for the availability, accuracy, or content of
          these third-party services. Use of such services is subject to their
          respective terms of service and privacy policies.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Data and Privacy</h3>
        <p>
          Please refer to our{" "}
          <a href="/privacy" className={styles.link}>
            Privacy Policy
          </a>{" "}
          for information about how we handle your data. By using this
          application, you acknowledge and agree to our data practices as
          described in the privacy policy.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Acceptance of Terms</h3>
        <p>
          By accessing and using this application, you accept and agree to be
          bound by the terms and provision of this disclaimer. If you do not
          agree to abide by the above, please do not use this application.
        </p>
      </div>
    </div>
  );
}

export default function Disclaimer() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <DisclaimerContent />
      </Suspense>
    </ErrorBoundary>
  );
}
