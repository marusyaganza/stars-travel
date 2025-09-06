"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./ImageSlideshow.module.css";

const images = [
  {
    image:
      "https://images.nightcafe.studio/ik-seo/jobs/0d5fZJZ1QqcFhislX9Ib/0d5fZJZ1QqcFhislX9Ib--1--gxpjn/cad-bane-from-star-wars-bounty-hunter-alien.jpg?tr=w-1600,c-at_max",
    alt: "Bounty hunter",
  },
  {
    image:
      "https://images.nightcafe.studio/ik-seo/jobs/fZ2BurFfcI01ZqQdVFM5/fZ2BurFfcI01ZqQdVFM5--1--89s4y/star-wars.jpg?tr=w-1600,c-at_max",
    alt: "AT-AT Walker",
  },
  {
    image:
      "https://images.nightcafe.studio/ik-seo/jobs/NJM17QUARPPlFDcZIHs1/NJM17QUARPPlFDcZIHs1--0--wlxsg/wookiee-jedi-on-coruscant.jpg?tr=w-1600,c-at_max",
    alt: "Wookie Jedi on Coruscant",
  },
  {
    image:
      "https://images.nightcafe.studio/ik-seo/jobs/9iYCIUU7R36NMqQ3uarW/9iYCIUU7R36NMqQ3uarW--bi0dd/tatooine.jpg?tr=w-1600,c-at_max",
    alt: "Famous bounty hunter on Tatooine",
  },
  {
    image:
      "https://images.nightcafe.studio/ik-seo/jobs/2fmXLLqj1MJiOhifRwMY/2fmXLLqj1MJiOhifRwMY--0--eivtd/a-sith-on-mustafar.jpg?tr=w-1600,c-at_max",
    alt: "Sith on Mustafar",
  },
  {
    image:
      "https://images.nightcafe.studio/ik-seo/jobs/ZiXg8U5pt7G1CBldOpUt/ZiXg8U5pt7G1CBldOpUt--1--goo1s/female-sith-pureblood-with-red-skinz-yellow-eyes-grey-hair-white-dathomir-witch-tattoos-wearing-ninj.jpg?tr=w-1080,c-at_max",
    alt: "Dathomir witch",
  },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          width={800}
          height={600}
          className={index === currentImageIndex ? styles.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
