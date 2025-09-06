"use server";

import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { getUserByEmail } from "@/lib/auth/user";
import { ActionResponse } from "../../types";
import {
  UserLoginSchema,
  validateFormData,
  createValidationError,
} from "@/lib/validation";
import { validateCSRFTokenFromRequest } from "@/lib/auth/csrf";
import { logAuthError } from "@/lib/logger-utils";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";
import { extractFormData } from "@/lib/util/extractFormData";
import { isLoginData } from "@/types/user";

export async function signInAction(
  formData: FormData
): Promise<ActionResponse> {
  const userInput = extractFormData(formData);
  try {
    // Check rate limit first
    const rateLimitResult = await checkRateLimit(
      RATE_LIMIT_CONFIGS.SIGN_IN,
      "sign-in"
    );
    if (!rateLimitResult.success) {
      return {
        success: false,
        message: rateLimitResult.message || "Rate limit exceeded",
        error: "Rate limit exceeded",
      };
    }

    // Validate CSRF token
    const isCSRFValid = await validateCSRFTokenFromRequest(formData);
    if (!isCSRFValid) {
      return {
        success: false,
        message: "Invalid request. Please try again.",
        error: "CSRF validation failed",
      };
    }

    // Use the new validation system
    const validationResult = validateFormData(UserLoginSchema, formData);

    if (!validationResult.success) {
      return createValidationError(validationResult.errors, userInput);
    }

    if (!isLoginData(userInput)) {
      return {
        success: false,
        message: "Invalid login data",
        currentValues: userInput,
        errors: {
          email: ["Invalid login data"],
          password: ["Invalid login data"],
        },
      };
    }

    const validatedData = validationResult.data;

    const existingUser = await getUserByEmail(validatedData.email);

    if (!existingUser) {
      return {
        success: false,
        message: "Email or password is incorrect",
        currentValues: userInput,
        errors: {
          email: ["Email or password is incorrect"],
          password: ["Email or password is incorrect"],
        },
      };
    }

    const { password: hashedPassword } = existingUser;

    const isValid = await verifyPassword(
      validatedData.password,
      hashedPassword
    );

    if (!isValid) {
      return {
        success: false,
        message: "Email or password is incorrect",
        currentValues: userInput,
        errors: {
          email: ["Email or password is incorrect"],
          password: ["Email or password is incorrect"],
        },
      };
    }
    await createSession(existingUser.id);

    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    await logAuthError("sign in", error);
    return {
      success: false,
      message: "An error occurred while signing in",
      currentValues: userInput,
      error: "Failed to sign in",
    };
  }
}
