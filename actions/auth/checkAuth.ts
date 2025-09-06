"use server";

import { getSession } from "@/lib/auth/session";
import { checkUserExists } from "@/lib/auth/user";
import { logError } from "@/lib/logger-utils";

export async function checkAuth(): Promise<boolean> {
  try {
    const sessionData = await getSession();
    if (!sessionData?.userId) {
      return false;
    }
    return await checkUserExists(sessionData.userId);
  } catch (err) {
    await logError("Error checking authentication", err);
    return false;
  }
}
