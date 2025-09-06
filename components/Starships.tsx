import { CardProps } from "./Card/Card";
import { Catalog } from "./Catalog/Catalog";

const STARSHIPS: CardProps[] = [
  {
    name: "Millennium Falcon",
    desc: "The fastest hunk of junk in the galaxy.",
    img: "https://images.nightcafe.studio/jobs/DcQOQeYqvUdTM64EVyKF/DcQOQeYqvUdTM64EVyKF--l9Hg.jpeg?tr=w-1080,c-at_max",
    url: "/starships/10",
  },
  {
    name: "X-Wing Starfighter",
    desc: "Agile and powerful, perfect for combat missions.",
    img: "https://images.nightcafe.studio/jobs/ARAnDbQxf4RLe17dtLfB/ARAnDbQxf4RLe17dtLfB-pugu_.jpeg?tr=w-1080,c-at_max",
    url: "/starships/12",
  },
  {
    name: "Death Star",
    desc: "A moon-sized Imperial superweapon capable of destroying entire planets with a single blast.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/1dBCGqX912OHJ5xxfFOh/1dBCGqX912OHJ5xxfFOh--1--vlx6p/death-star.jpg?tr=w-1080,c-at_max",
    url: "/starships/9",
  },
  {
    name: "Imperial Star Destroyer",
    desc: "Command the galaxy with this iconic vessel.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/CfS8VzuSpfKkvW5ywP5Q/CfS8VzuSpfKkvW5ywP5Q--vj6yd/imperial-star-destroyer.jpg?tr=w-1600,c-at_max",
    url: "/starships/3",
  },
  {
    name: "Jedi Starfighter",
    desc: "Quick and nimble, favored by Jedi Knights.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/FdNDgCbZtj0aiYiENXoQ/FdNDgCbZtj0aiYiENXoQ--0--5bdmj/ill-never-call-you-master-2.jpg?tr=w-1080,c-at_max",
    url: "/starships/48",
  },
  {
    name: "CR90 Corvette",
    desc: "A versatile and iconic starship manufactured by Corellian Engineering Corporation, also known as Rebel Blockade Runner.",
    img: "https://images.nightcafe.studio/ik-seo/jobs/kGC4vWu8gbWHVeN03DI3/kGC4vWu8gbWHVeN03DI3--1--5w627/rebel-cargo-transport-console-over-jakku.jpg?tr=w-640,c-at_max",
    url: "/starships/2",
  },
];

export function Starships() {
  return <Catalog items={STARSHIPS} />;
}
