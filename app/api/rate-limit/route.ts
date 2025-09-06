import { NextResponse } from "next/server";
import { getRateLimitInfo, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";

export async function GET() {
  try {
    const rateLimitInfo = {
      signIn: await getRateLimitInfo(RATE_LIMIT_CONFIGS.SIGN_IN, "sign-in"),
      signUp: await getRateLimitInfo(RATE_LIMIT_CONFIGS.SIGN_UP, "sign-up"),
      generalAuth: await getRateLimitInfo(
        RATE_LIMIT_CONFIGS.GENERAL_AUTH,
        "general-auth"
      ),
      csrf: await getRateLimitInfo(RATE_LIMIT_CONFIGS.CSRF, "csrf-token"),
    };

    return NextResponse.json(
      {
        rateLimits: {
          signIn: {
            ...rateLimitInfo.signIn,
            limit: RATE_LIMIT_CONFIGS.SIGN_IN.maxRequests,
            windowMs: RATE_LIMIT_CONFIGS.SIGN_IN.windowMs,
          },
          signUp: {
            ...rateLimitInfo.signUp,
            limit: RATE_LIMIT_CONFIGS.SIGN_UP.maxRequests,
            windowMs: RATE_LIMIT_CONFIGS.SIGN_UP.windowMs,
          },
          generalAuth: {
            ...rateLimitInfo.generalAuth,
            limit: RATE_LIMIT_CONFIGS.GENERAL_AUTH.maxRequests,
            windowMs: RATE_LIMIT_CONFIGS.GENERAL_AUTH.windowMs,
          },
          csrf: {
            ...rateLimitInfo.csrf,
            limit: RATE_LIMIT_CONFIGS.CSRF.maxRequests,
            windowMs: RATE_LIMIT_CONFIGS.CSRF.windowMs,
          },
        },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300", // Cache for 5 minutes
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  } catch (error) {
    console.error("Error getting rate limit info:", error);
    return NextResponse.json(
      { error: "Failed to get rate limit information" },
      {
        status: 500,
        headers: {
          // Security: Errors should not be cached
          "Cache-Control": "no-store, no-cache, must-revalidate, private",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  }
}
