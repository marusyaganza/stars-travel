import { JWT_TOKEN_EXPIRES_IN } from "@/constants";
import { jwtVerify, SignJWT } from "jose";
import { logError } from "@/lib/logger-utils";

interface JWTPayload {
  userId: string;
  exp?: number;
  iat?: number;
  [key: string]: string | number | boolean | null | undefined;
}

export async function generateJWT(
  payload: JWTPayload,
  expiresIn: string | number = JWT_TOKEN_EXPIRES_IN
): Promise<string> {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable not set");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
}

/**
 * Verifies a JWT and returns the decoded payload if valid.
 * Throws an error if the token is invalid or expired.
 * @param token - The JWT string to verify
 * @returns The decoded payload as JWTPayload
 */

export async function verifyJWT(token: string): Promise<JWTPayload> {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable not set");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload as JWTPayload;
  } catch (err) {
    await logError("JWT validation error", err);
    throw new Error("Invalid or expired token");
  }
}
