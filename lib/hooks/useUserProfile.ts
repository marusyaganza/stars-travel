import { getCurrentUser } from "@/lib/auth/user";
import { logError } from "@/lib/logger-utils";
import { ROLE } from "@prisma/client";

export interface UserProfileData {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    bookings: { id: string }[];
  } | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

export async function getUserProfileData(): Promise<UserProfileData> {
  try {
    const userResult = await getCurrentUser();

    if (!userResult.success && userResult.error) {
      await logError(
        "User data error in getUserProfileData",
        new Error(userResult.error),
        {
          function: "getUserProfileData",
          page: "profile",
        }
      );
    }

    const user = userResult.data;
    const isAdmin = user?.role === ROLE.ADMIN;

    return {
      user: user || null,
      isAdmin,
      isLoading: false,
      error: userResult.error || null,
    };
  } catch (error) {
    await logError("Unexpected error in getUserProfileData", error, {
      function: "getUserProfileData",
      page: "profile",
    });

    return {
      user: null,
      isAdmin: false,
      isLoading: false,
      error: "Failed to load user profile data",
    };
  }
}
