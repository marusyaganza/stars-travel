import { FlightResult } from "@/types/flight";
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";
import styles from "./FlightTable.module.css";
import { ActionButton } from "../ActionButton/ActionButton";
import clsx from "clsx";

type FlightsTableProps = {
  flights: FlightResult[];
  action?: "Cancel" | "Book";
  bookings?: string[];
  withAction?: boolean;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const FlightsTable: React.FC<FlightsTableProps> = ({
  flights,
  action,
  bookings = [],
  withAction = true,
}) => {
  const renderActionButton = (flight: FlightResult) => {
    if (flight?.cancelled) {
      return "Cancelled";
    }
    if (flight?.archived) {
      return "Archived";
    }
    if (bookings.includes(flight.id)) {
      return "Booked!";
    }
    if (action) {
      return (
        <ActionButton
          disabled={bookings.includes(flight.id)}
          operation={action}
          flightId={flight.id}
        />
      );
    }
    return "Scheduled";
  };

  const renderMobileCard = (flight: FlightResult) => (
    <div
      key={flight.id}
      className={clsx(
        styles.mobileCard,
        flight?.cancelled || flight?.archived ? styles.disabled : undefined
      )}
    >
      <div className={styles.mobileCardHeader}>
        <ImageWithFallback
          src={flight.logo || "/img/logo.png"}
          fallbackSrc="/img/logo.png"
          alt="Logo"
          className={styles.mobileLogo}
          width={32}
          height={32}
        />
        <span className={styles.mobileDate}>{formatDate(flight.date)}</span>
      </div>

      <div className={styles.mobileCardContent}>
        <div className={styles.mobileRoute}>
          <div className={styles.mobileOrigin}>
            <span className={styles.mobileLabel}>From:</span>
            <span className={styles.mobileValue}>{flight.origin.name}</span>
          </div>
          <div className={styles.mobileDestination}>
            <span className={styles.mobileLabel}>To:</span>
            <span className={styles.mobileValue}>
              {flight.destination.name}
            </span>
          </div>
        </div>

        <div className={styles.mobileStarship}>
          <span className={styles.mobileLabel}>Starship:</span>
          <span className={styles.mobileValue}>{flight.starship.name}</span>
        </div>

        {withAction && (
          <div className={styles.mobileAction}>
            {renderActionButton(flight)}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.tableContainer}>
      <div className={styles.desktopView}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Date</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Vessel Class</th>
              {withAction && <th>{action ? "Action" : "Status"}</th>}
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr
                className={clsx(
                  flight?.cancelled || flight?.archived
                    ? styles.disabled
                    : undefined
                )}
                key={flight.id}
              >
                <td>
                  <ImageWithFallback
                    src={flight.logo || "/img/logo.png"}
                    fallbackSrc="/img/logo.png"
                    alt="Logo"
                    className={styles.logo}
                    width={20}
                    height={20}
                  />
                </td>
                <td>{formatDate(flight.date)}</td>
                <td>{flight.origin.name}</td>
                <td>{flight.destination.name}</td>
                <td>{flight.starship.name}</td>
                {withAction && <td>{renderActionButton(flight)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mobileView}>{flights.map(renderMobileCard)}</div>
    </div>
  );
};
