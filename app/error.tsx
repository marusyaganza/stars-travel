"use client";
import Image from "next/image";
import styles from "./error.module.css";
import Link from "next/link";
export default function Error() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Something went wrong</h1>
        <Image
          width={500}
          height={500}
          src="https://images.nightcafe.studio/ik-seo/jobs/rdvlnDJVeMDICG8GiSkL/rdvlnDJVeMDICG8GiSkL--0--hsgk0/error.jpg?tr=w-1080,c-at_max"
          alt="Error"
        />
        <Link className={styles.link} href="/">
          Go to main page
        </Link>
      </div>
    </main>
  );
}
