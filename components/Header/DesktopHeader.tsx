import Image from "next/image";
import { NavLink } from "../NavLink/NavLink";
import { AuthButton } from "../AuthButton/AuthButton";
import styles from "./Header.module.css";

const NAVLINKS = [
  {
    url: "/flights",
    text: "flights",
  },
  {
    url: "/flights/departures",
    text: "departures",
  },
  {
    url: "/flights/arrivals",
    text: "arrivals",
  },
  {
    url: "/profile",
    text: "profile",
  },
];

export function DesktopHeader() {
  return (
    <nav className={styles.header}>
      <ul className={styles.navigation}>
        {NAVLINKS.map((link) => {
          return (
            <li key={link.text} className={styles.headerItem}>
              <Image
                src="/icons/planet.svg"
                width={20}
                height={20}
                alt="planet icon"
              />
              <NavLink url={link.url} text={link.text} />
            </li>
          );
        })}
      </ul>
      <AuthButton className={styles.authButton} />
    </nav>
  );
}
