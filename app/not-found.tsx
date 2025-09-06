import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Return to Stars Travel to continue your intergalactic journey.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image width={500} height={500} src="/img/404.webp" alt="Not found" />
        <h1 className={styles.heading}>Page is not found</h1>
        <Link href="/" className={styles.link}>
          Go to main page
        </Link>
      </div>
    </div>
  );
}
