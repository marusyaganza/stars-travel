"use client";
import { useEffect } from "react";
import { NavLink } from "../NavLink/NavLink";
import { AuthButton } from "../AuthButton/AuthButton";
import styles from "./Header.module.css";
import { clsx } from "clsx";

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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: Readonly<MobileMenuProps>) {
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={clsx(
          styles.mobileMenuBackdrop,
          isOpen && styles.mobileMenuBackdropOpen
        )}
        onClick={handleBackdropClick}
      />
      <div className={clsx(styles.mobileMenu, isOpen && styles.mobileMenuOpen)}>
        <div className={styles.mobileMenuHeader}>
          <h2 className={styles.mobileMenuTitle}>Navigation</h2>
          <button
            className={styles.mobileMenuClose}
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            ×
          </button>
        </div>

        <ul className={styles.mobileMenuNav}>
          {NAVLINKS.map((link) => (
            <li key={link.text} className={styles.mobileMenuItem}>
              <NavLink url={link.url} text={link.text} />
            </li>
          ))}
        </ul>

        <div className={styles.mobileMenuAuth}>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
