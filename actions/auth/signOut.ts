"use server";
import { deleteSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { logAuthError } from "@/lib/logger-utils";
import { validateCSRFTokenFromRequest } from "@/lib/auth/csrf";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";

export async function signOut(formData: FormData): Promise<void> {
  try {
    // Check rate limit first
    const rateLimitResult = await checkRateLimit(
      RATE_LIMIT_CONFIGS.GENERAL_AUTH,
      "sign-out"
    );
    if (!rateLimitResult.success) {
      throw new Error(rateLimitResult.message || "Rate limit exceeded");
    }

    // Validate CSRF token
    const isCSRFValid = await validateCSRFTokenFromRequest(formData);
    if (!isCSRFValid) {
      throw new Error("Invalid request. CSRF validation failed.");
    }

    await deleteSession();
  } catch (error) {
    await logAuthError("sign out", error);
    throw new Error("Failed to sign out");
  } finally {
    redirect("/signin");
  }
}
