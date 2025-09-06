import { NextResponse } from "next/server";
import { getCSRFToken } from "@/lib/auth/csrf";
import logger from "@/lib/logger";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";

export async function GET() {
  try {
    // Check rate limit
    const rateLimitResult = await checkRateLimit(
      RATE_LIMIT_CONFIGS.CSRF,
      "csrf-token"
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: rateLimitResult.message,
          resetTime: rateLimitResult.resetTime?.toISOString(),
        },
        {
          status: rateLimitResult.statusCode || 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetTime?.toISOString() || "",
            "Cache-Control": "no-store, no-cache, must-revalidate, private",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
          },
        }
      );
    }

    const token = await getCSRFToken();

    return NextResponse.json(
      { token },
      {
        headers: {
          "X-RateLimit-Remaining": rateLimitResult.remaining?.toString() || "",
          "X-RateLimit-Reset": rateLimitResult.resetTime?.toISOString() || "",
          "Cache-Control": "no-store, no-cache, must-revalidate, private",
          Pragma: "no-cache",
          Expires: "0",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  } catch (error) {
    await logger.error({
      message: "Error generating CSRF token",
      err: error,
      route: "GET /api/csrf",
    });
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, private",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  }
}
