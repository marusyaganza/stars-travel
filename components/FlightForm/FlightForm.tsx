"use client";
import clsx from "clsx";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useActionState } from "react";
import { newFlight } from "@/actions/flights/newFlight";
import { useRouter } from "next/navigation";
import { FormError } from "../FormError/FormError";
import { PlanetSelect } from "../Selects/PlanetSelect";
import { StarshipSelect } from "../Selects/StarshipSelect";
import { ActionResponse } from "@/actions/types";
import { LogoSelect } from "../Selects/LogoSelect";
import { ACTION_INITIAL_STATE } from "@/actions/constants";
import styles from "./FlightForm.module.css";
export interface FlightFormProps {
  className?: string;
}

export function FlightForm({ className }: Readonly<FlightFormProps>) {
  const router = useRouter();
  async function onSubmit(_: ActionResponse, formData: FormData) {
    try {
      const result = await newFlight(formData);
      if (result?.success) {
        router.replace("/flights");
      }
      return result;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || "An error occurred",
        errors: undefined,
      };
    }
  }
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(onSubmit, ACTION_INITIAL_STATE);

  return (
    <div className={clsx(className, styles.container)}>
      <form action={formAction} className={styles.form}>
        <PlanetSelect
          name="origin"
          label="Select Origin"
          disabled={isPending}
          errors={state?.errors?.["origin"]}
        />
        <PlanetSelect
          name="destination"
          label="Select Destination"
          disabled={isPending}
          errors={state?.errors?.["destination"]}
        />
        <StarshipSelect
          name="starship"
          label="Select Starship"
          disabled={isPending}
          errors={state?.errors?.["starship"]}
        />
        <div className={styles.dateInputContainer}>
          <Input type="date" name="date" disabled={isPending}>
            Select Date
          </Input>
          <FormError errors={state?.errors?.["date"]} />
        </div>

        <LogoSelect name="logo" label="Select Carrier" disabled={isPending} />

        <Button type="submit" disabled={isPending} size="M">
          Submit
        </Button>
      </form>
    </div>
  );
}
