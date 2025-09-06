export type FlightInput = {
  date: string;
  destination: string;
  origin: string;
  starship: string;
  logo: string;
};

export type Flight = {
  date: string;
  destination: string;
  id: string;
  isCancelled?: boolean;
  origin: string;
  starship: string;
  logo: string;
};
