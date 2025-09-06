"use client";
import Image from "next/image";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";
import { clsx } from "clsx";

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.mobileHeader}>
      <div className={styles.mobileHeaderContent}>
        <Image
          className={styles.mobileLogo}
          src="/icons/planet.svg"
          width={32}
          height={32}
          alt="planet icon"
        />

        <button
          className={styles.burgerButton}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={clsx(
              styles.burgerLine,
              isMenuOpen && styles.burgerLineOpen
            )}
          ></span>
          <span
            className={clsx(
              styles.burgerLine,
              isMenuOpen && styles.burgerLineOpen
            )}
          ></span>
          <span
            className={clsx(
              styles.burgerLine,
              isMenuOpen && styles.burgerLineOpen
            )}
          ></span>
        </button>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
}
