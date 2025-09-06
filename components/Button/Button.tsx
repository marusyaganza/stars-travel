import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "S" | "M";
}

export function Button({
  className,
  children,
  size = "S",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={clsx(className, styles.button, styles[`size${size}`])}
      {...props}
    >
      {children}
    </button>
  );
}
