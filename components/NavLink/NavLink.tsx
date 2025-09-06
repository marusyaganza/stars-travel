"use client";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.css";
type NavLinkProps = {
  url: string;
  text: string;
};

export function NavLink({ url, text }: Readonly<NavLinkProps>) {
  const pathName = usePathname();
  return (
    <Link
      className={clsx(pathName === url && styles.active, styles.navLink)}
      href={url}
    >
      {text}
    </Link>
  );
}
