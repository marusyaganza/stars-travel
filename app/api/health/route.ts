import { NextResponse } from "next/server";
import { testRedisConnection } from "@/lib/redis";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";

export async function GET() {
  try {
    // Test Redis connection
    const redisConnected = await testRedisConnection();

    // Test rate limiting (this will increment the counter)
    const rateLimitTest = await checkRateLimit(
      RATE_LIMIT_CONFIGS.GENERAL_AUTH,
      "health-check"
    );

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        services: {
          redis: redisConnected ? "connected" : "disconnected",
          rateLimiting: rateLimitTest.success ? "working" : "limited",
        },
        rateLimit: {
          success: rateLimitTest.success,
          remaining: rateLimitTest.remaining,
          resetTime: rateLimitTest.resetTime?.toISOString(),
        },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=60", // Cache for 1 minute
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate", // Don't cache errors
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  }
}
