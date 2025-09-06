import { Card, CardProps } from "../Card/Card";
import styles from "./Catalog.module.css";
export interface CatalogProps {
  items: CardProps[];
}

export function Catalog({ items }: Readonly<CatalogProps>) {
  return (
    <section className={styles.container}>
      {items.map((item: CardProps) => {
        return <Card key={item.name} {...item} />;
      })}
    </section>
  );
}
