import { CardProps } from "@/components/Card/Card";
import { Catalog } from "@/components/Catalog/Catalog";

const DESTINATIONS: CardProps[] = [
  {
    name: "Tatooine",
    url: "/planets/1",
    desc: "A desert planet home to twin suns and endless adventures.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/a12jlRE5Rya4x9xfaysq/a12jlRE5Rya4x9xfaysq--1--kutih/tatooine.jpg?tr=w-1600,c-at_max",
  },
  {
    name: "Coruscant",
    url: "/planets/9",
    desc: "The bustling city-planet and political center of the galaxy.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/XYKjcf0azcy3K6n8Y18E/XYKjcf0azcy3K6n8Y18E--2--tvpfp/coruscant.jpg?tr=w-640,c-at_max",
  },
  {
    name: "Dagobah",
    url: "/planets/5",
    desc: "A mysterious swamp planet steeped in the Force.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/HpyqM3egaWjlEv7ANepf/HpyqM3egaWjlEv7ANepf--1--r0bft/dagobah.jpg?tr=w-1080,c-at_max",
  },
  {
    name: "Endor",
    url: "/planets/7",
    desc: "The forest moon known for its lush greenery and Ewok inhabitants.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/w9XouLylfNY41PFpbyhb/w9XouLylfNY41PFpbyhb--1--3uvup/chill-time.jpg?tr=w-1200,c-at_max",
  },
  {
    name: "Mustafar",
    url: "/planets/13",
    desc: "A volcanic world strong with the Dark Side of the Force.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/dT6d1L8ncrG6UqdyFsZd/dT6d1L8ncrG6UqdyFsZd--4--ie6i9_15.625x/mustafar.jpg?tr=w-1600,c-at_max",
  },
  {
    name: "Dathomir",
    url: "/planets/36",
    desc: "A remote and mysterious planet shrouded in blood-red light, Dathomir is infamous for its dark side energy and dangerous wildlife.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/A2BM8hFRGebThgUUfoOc/A2BM8hFRGebThgUUfoOc--1--klr7i/planet-dathomir.jpg?tr=w-1080,c-at_max",
  },
];

export function Destinations() {
  return <Catalog items={DESTINATIONS} />;
}
