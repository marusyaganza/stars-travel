import Link from "next/link";
import styles from "./Footer.module.css";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.icon}
        href="https://github.com/marusyaganza/stars-travel"
        target="_blank"
      >
        <span className={styles.linkText}>view the project on GitHub</span>
        <GitHubIcon width={30} height={30} />
      </a>
      <Link className={styles.disclaimerLink} href="/privacy">
        Privacy Policy
      </Link>
      <p className={styles.disclaimer}>
        This is a fan-made, non-commercial demo project. See{" "}
        <Link className={styles.disclaimerLink} href="/disclaimer">
          Legal & Disclaimers
        </Link>
      </p>
    </footer>
  );
}
