export interface FlightResult {
  id: string;
  date: Date;
  cancelled: boolean;
  logo: string | null;
  archived?: boolean;
  origin: {
    name: string;
  };
  destination: {
    name: string;
  };
  starship: {
    name: string;
  };
}
