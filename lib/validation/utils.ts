import { z } from "zod";
import { ActionResponse } from "@/actions/types";

// Generic validation function
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

// Create validation error response
export function createValidationError(
  errors: z.ZodError,
  currentValues?: Record<string, string>
): ActionResponse {
  return {
    success: false,
    message: "Validation failed",
    errors: errors.flatten().fieldErrors as Record<string, string[]>,
    currentValues,
  };
}

// Validate form data with a schema
export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  formData: FormData
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const data = Object.fromEntries(formData.entries());
  return validateInput(schema, data);
}
