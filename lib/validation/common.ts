import { z } from "zod";

export const idSchema = z.string().cuid("Invalid ID format");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address")
  .max(255, "Email is too long");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .refine(
    (val) => /[A-Z]/.test(val),
    "Password must contain an uppercase letter"
  )
  .refine(
    (val) => /[a-z]/.test(val),
    "Password must contain a lowercase letter"
  )
  .refine((val) => /\d/.test(val), "Password must contain a number")
  .refine(
    (val) => /[^A-Za-z0-9]/.test(val),
    "Password must contain a special character"
  );

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name is too long")
  .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters");

export const dateSchema = z
  .string()
  .min(1, "Date is required")
  .refine((val) => {
    // Check if it's a valid date string in YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(val)) return false;

    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Invalid date format")
  .refine((val) => {
    const selectedDate = new Date(val);
    const today = new Date();
    // Reset time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today;
  }, "Date must be today or in the future");

export const stringSchema = z
  .string()
  .min(1, "This field is required")
  .max(255, "This field is too long");

export const optionalStringSchema = z
  .string()
  .max(255, "This field is too long")
  .optional();

export const numberSchema = z.coerce
  .number()
  .positive("Must be a positive number");

export const integerSchema = z.coerce
  .number()
  .int("Must be an integer")
  .positive("Must be a positive number");
