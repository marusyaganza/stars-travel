import { SelectProps, Select } from "./Select/Select";

const options = [
  {
    value: "/img/empire-logo.png",
    text: "empire",
  },
  {
    value: "/img/rebels-logo.jpeg",
    text: "rebels",
  },
  {
    value: "/img/jedi-logo.png",
    text: "jedi",
  },
];

export function LogoSelect(props: Readonly<Omit<SelectProps, "options">>) {
  return <Select {...props} options={options} />;
}
