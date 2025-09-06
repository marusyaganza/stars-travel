interface BetterStackLogPayload {
  message: string;
  level: string;
  timestamp: string;
  service: string;
  environment: string;
  [key: string]: unknown;
}

class BetterStackLogger {
  private endpoint: string;
  private isEnabled: boolean;
  private readonly TIMEOUT_MS = 10000; // 10 second timeout

  constructor() {
    this.endpoint = process.env.LOG_ENDPOINT || "";
    this.isEnabled = !!this.endpoint;
  }

  async sendLog(logData: Record<string, unknown>): Promise<void> {
    if (!this.isEnabled) {
      return;
    }

    // Only run on server-side
    if (typeof window !== "undefined") {
      return;
    }

    try {
      const payload: BetterStackLogPayload = {
        message: (logData.message as string) || "Error occurred",
        level: "error",
        timestamp: new Date().toISOString(),
        service: "up-next",
        environment: process.env.NODE_ENV || "development",
        ...(logData as Record<string, unknown>),
      };

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      try {
        const response = await fetch(this.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BETTER_STACK_API_KEY}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          // Using console.error here to avoid infinite loops in the logging system
          console.error(
            `Better Stack logging failed: ${response.status} ${response.statusText}`
          );
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          console.error("Better Stack logging timed out");
        } else {
          throw fetchError;
        }
      }
    } catch {
      // Don't log to console to avoid infinite loops
      // Just silently fail
    }
  }

  isConfigured(): boolean {
    return this.isEnabled;
  }
}

export const betterStackLogger = new BetterStackLogger();
