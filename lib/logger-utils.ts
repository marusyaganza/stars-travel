import logger from "./logger";

/**
 * Log an error with context information
 */
export async function logError(
  message: string,
  error: unknown,
  context?: Record<string, unknown>
) {
  // Only run on server-side
  if (typeof window !== "undefined") {
    return;
  }

  await logger.error({
    message,
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...context,
  });
}

/**
 * Log an authentication error
 */
export async function logAuthError(
  operation: string,
  error: unknown,
  context?: Record<string, unknown>
) {
  // Only run on server-side
  if (typeof window !== "undefined") {
    return;
  }

  await logError(`Authentication ${operation} failed`, error, {
    operation,
    ...context,
  });
}
