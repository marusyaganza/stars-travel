import styles from "./MainHeader.module.css";
import Link from "next/link";

export function MainHeader() {
  return (
    <h1 className={styles.mainHeader}>
      <Link href="/">Stars Travel</Link>
    </h1>
  );
}
