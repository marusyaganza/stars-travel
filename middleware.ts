import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth/jwt";
import { logError } from "@/lib/logger-utils";
import { isTokenBlacklisted } from "@/lib/auth/session";

export const config = {
  matcher: ["/profile", "/flights/new"],
};

export async function middleware(request: NextRequest) {

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    // Check if token is blacklisted
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    await verifyJWT(token);
    return NextResponse.next();
  } catch (error) {
    await logError("Middleware error", error, {
      path: request.nextUrl.pathname,
      token: token ? "present" : "missing",
    });
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}
