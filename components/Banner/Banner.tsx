import Link from "next/link";
import ImageSlideshow from "../ImageSlideshow/ImageSlideshow";
import styles from "./Banner.module.css";

export function Banner() {
  return (
    <header className={styles.header}>
      <div className={styles.slideshow}>
        <ImageSlideshow />
      </div>
      <div>
        <div className={styles.hero}>
          <h2 className={styles.heading}>
            Explore the Galaxy with Stars Travel
          </h2>
          <p>
            Book your intergalactic flight to iconic destinations across the
            Star Wars universe.
          </p>
        </div>
        <p className={styles.hero}>Ready to embark on your next adventure?</p>
        <div className={styles.cta}>
          <Link className={styles.ctaButton} href="/flights">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
