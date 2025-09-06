import { cookies } from "next/headers";
import { randomBytes, createHmac } from "crypto";
import { CSRF_EXPIRES_IN } from "@/constants";

const CSRF_SECRET =
  process.env.CSRF_SECRET || process.env.JWT_SECRET || "fallback-secret";
const CSRF_COOKIE_NAME = "csrf_token";

export function generateCSRFToken(): string {
  const token = randomBytes(32).toString("hex");
  const timestamp = Date.now().toString();
  const signature = createHmac("sha256", CSRF_SECRET)
    .update(token + timestamp)
    .digest("hex");

  return `${token}.${timestamp}.${signature}`;
}

export function validateCSRFToken(token: string): boolean {
  try {
    const [tokenPart, timestamp, signature] = token.split(".");

    if (!tokenPart || !timestamp || !signature) {
      return false;
    }

    // Check if token is not too old (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > CSRF_EXPIRES_IN * 1000) {
      return false;
    }

    // Verify signature
    const expectedSignature = createHmac("sha256", CSRF_SECRET)
      .update(tokenPart + timestamp)
      .digest("hex");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

export async function getCSRFToken(): Promise<string> {
  const cookieStore = await cookies();
  let token = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!token || !validateCSRFToken(token)) {
    token = generateCSRFToken();
    cookieStore.set({
      name: CSRF_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: CSRF_EXPIRES_IN,
      path: "/",
      sameSite: "lax",
    });
  }

  return token;
}

export async function validateCSRFTokenFromRequest(
  formData: FormData
): Promise<boolean> {
  const token = formData.get("csrf_token") as string;
  if (!token) {
    console.warn("CSRF token missing from request");
    return false;
  }

  const isValid = validateCSRFToken(token);
  if (!isValid) {
    console.warn("CSRF token validation failed");
  }

  return isValid;
}

export function extractTokenFromCSRF(csrfToken: string): string {
  return csrfToken.split(".")[0];
}
