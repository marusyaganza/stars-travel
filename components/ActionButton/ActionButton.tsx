"use client";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button, ButtonProps } from "../Button/Button";
import { cancelBooking } from "@/actions/flights/cancelBooking";
import { bookFlight } from "@/actions/flights/bookFlight";

export interface ActionButtonProps extends ButtonProps {
  operation: "Cancel" | "Book";
  flightId: string;
  className?: string;
}
export function ActionButton({
  operation,
  flightId,
  className,
  ...props
}: Readonly<ActionButtonProps>) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        let response;
        if (operation === "Cancel") {
          response = await cancelBooking(flightId);
        } else {
          response = await bookFlight(flightId);
        }

        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  };
  return (
    <Button {...props} onClick={handleClick} className={className}>
      {isPending ? "Loading..." : operation}
    </Button>
  );
}
