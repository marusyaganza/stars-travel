import styles from "./layout.module.css";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description:
    "Sign in or create your Stars Travel account to book intergalactic flights and explore the galaxy.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.page}>
      <MainHeader />
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
        <div className={styles.disclaimer}>
          <p>
            This is a personal, non-commercial personal project created for fun
            and learning purposes. Feel free to explore and enjoy! Please note
            that no registration emails or confirmation messages will be sent,
            so sign-in and sign-up are simulated for demonstration only.
          </p>
        </div>
      </div>
    </main>
  );
}
