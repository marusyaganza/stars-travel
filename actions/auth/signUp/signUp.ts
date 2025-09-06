"use server";
import { createSession } from "@/lib/auth/session";
import { createUser, getUserByEmail } from "@/lib/auth/user";
import {
  UserCreateSchema,
  validateFormData,
  createValidationError,
} from "@/lib/validation";
import { validateCSRFTokenFromRequest } from "@/lib/auth/csrf";
import { logAuthError } from "@/lib/logger-utils";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";
import { extractFormData } from "@/lib/util/extractFormData";

export async function signUpAction(formData: FormData) {
  const userInput = extractFormData(formData);
  try {
    // Check rate limit first
    const rateLimitResult = await checkRateLimit(
      RATE_LIMIT_CONFIGS.SIGN_UP,
      "sign-up"
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
    const validationResult = validateFormData(UserCreateSchema, formData);

    if (!validationResult.success) {
      return createValidationError(validationResult.errors, userInput);
    }

    const validatedData = validationResult.data;

    const existingUser = await getUserByEmail(validatedData.email);

    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
        currentValues: userInput,
        errors: {
          email: ["User with this email already exists"],
        },
      };
    }

    const user = await createUser(validatedData);
    if (!user) {
      return {
        success: false,
        message: "User creation failed",
        currentValues: userInput,
      };
    }
    await createSession(user.id);
    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    await logAuthError("sign up", error);
    return {
      success: false,
      currentValues: userInput,
      message: "An error occurred while creating your account",
      error: "Failed to create account",
    };
  }
}
