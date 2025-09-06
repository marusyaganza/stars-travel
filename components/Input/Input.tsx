import { InputHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
}
export function Input({
  children,
  className,
  ...props
}: PropsWithChildren<InputProps>) {
  return (
    <label className={clsx(styles.label, className)}>
      {children}
      <input className={styles.input} type="text" {...props} />
    </label>
  );
}
