import { FlightInput } from "./types";

export function isFlightInput(
  values: Record<string, string>
): values is FlightInput {
  return (
    typeof values?.destination === "string" &&
    typeof values?.origin === "string" &&
    typeof values?.date === "string" &&
    typeof values?.starship === "string"
  );
}
