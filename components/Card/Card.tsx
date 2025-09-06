import styles from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
export interface CardProps {
  name: string;
  desc: string;
  img: string;
  url?: string;
}

export function Card({ name, desc, img, url }: Readonly<CardProps>) {
  return (
    <Link href={url ?? "#"} key={name} className={styles.container}>
      <Image src={img} width={275} height={275} alt={`${name} image`} />
      <h3>{name}</h3>
      <p className={styles.desc}>{desc}</p>
    </Link>
  );
}
