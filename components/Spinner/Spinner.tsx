import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading... May the Force be with you</p>
    </div>
  );
};
