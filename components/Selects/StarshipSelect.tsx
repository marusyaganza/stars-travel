import { Select, SelectProps } from "./Select/Select";
import { starshipOptions } from "./config/starshipOptions";

export function StarshipSelect(props: Readonly<Omit<SelectProps, "options">>) {
  return <Select {...props} options={starshipOptions} />;
}
