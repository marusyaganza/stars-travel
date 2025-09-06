import styles from "./FormError.module.css";
import clsx from "clsx";

export interface FormErrorProps {
  className?: string;
  errors?: string[];
}
/**Component description goes here */
export function FormError({ className, errors }: Readonly<FormErrorProps>) {
  return (
    <div className={clsx(className, styles.errorsContainer)}>
      {errors?.map((err) => {
        return (
          <p key={err} className={styles.error}>
            {err}
          </p>
        );
      })}
    </div>
  );
}
