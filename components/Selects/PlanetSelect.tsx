import { Select, SelectProps } from "./Select/Select";
import { planetOptions } from "./config/planetOptions";

export function PlanetSelect(props: Readonly<Omit<SelectProps, "options">>) {
  return <Select {...props} options={planetOptions} />;
}
