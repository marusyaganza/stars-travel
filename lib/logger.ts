import pino from "pino";
import { betterStackLogger } from "./better-stack";

// Configure Pino logger - simplified configuration to avoid worker thread issues
const logger = pino({
  level: "error",
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  // Disable file transport to avoid worker thread issues in Next.js
  transport: undefined,
});

// Enhanced logger that sends to both local file and Better Stack
const enhancedLogger = {
  error: async (obj: Record<string, unknown>) => {
    // Only run on server-side
    if (typeof window !== "undefined") {
      return;
    }
    logger.error(obj);

    // Send to Better Stack if configured
    if (betterStackLogger.isConfigured()) {
      await betterStackLogger.sendLog(obj);
    }
  },
  warn: logger.warn,
  info: logger.info,
  debug: logger.debug,
  trace: logger.trace,
  fatal: logger.fatal,
};

export default enhancedLogger;
