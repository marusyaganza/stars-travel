import { describe, it, expect, vi, beforeEach } from "vitest";
import { signInAction } from "./signIn";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { getUserByEmail } from "@/lib/auth/user";
import { validateCSRFTokenFromRequest } from "@/lib/auth/csrf";
import { logAuthError } from "@/lib/logger-utils";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";

// Mock all dependencies
vi.mock("@/lib/auth/password");
vi.mock("@/lib/auth/session");
vi.mock("@/lib/auth/user");
vi.mock("@/lib/auth/csrf");
vi.mock("@/lib/logger-utils");
vi.mock("@/lib/auth/rateLimit");

const mockVerifyPassword = vi.mocked(verifyPassword);
const mockCreateSession = vi.mocked(createSession);
const mockGetUserByEmail = vi.mocked(getUserByEmail);
const mockValidateCSRFTokenFromRequest = vi.mocked(
  validateCSRFTokenFromRequest
);
const mockLogAuthError = vi.mocked(logAuthError);
const mockCheckRateLimit = vi.mocked(checkRateLimit);

describe("signInAction", () => {
  const mockUserInput = {
    email: "test@example.com",
    password: "ValidPass123!",
  };

  const mockUser = {
    id: "user-123",
    email: "test@example.com",
    password: "hashedPassword123",
    name: "Test User",
    role: "USER" as const,
    createdAt: new Date(),
  };

  // Helper function to create FormData with the user input
  const createMockFormData = () => {
    const formData = new FormData();
    formData.append("email", mockUserInput.email);
    formData.append("password", mockUserInput.password);
    return formData;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    mockCheckRateLimit.mockResolvedValue({ success: true });
    mockValidateCSRFTokenFromRequest.mockResolvedValue(true);
    mockGetUserByEmail.mockResolvedValue(mockUser);
    mockVerifyPassword.mockResolvedValue(true);
    mockCreateSession.mockResolvedValue();
  });

  describe("successful sign in", () => {
    it("should successfully sign in a user with valid credentials", async () => {
      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result).toEqual({
        success: true,
        message: "Logged in successfully",
      });

      expect(mockCheckRateLimit).toHaveBeenCalledWith(
        RATE_LIMIT_CONFIGS.SIGN_IN,
        "sign-in"
      );
      expect(mockValidateCSRFTokenFromRequest).toHaveBeenCalledWith(
        mockFormData
      );
      expect(mockGetUserByEmail).toHaveBeenCalledWith(mockUserInput.email);
      expect(mockVerifyPassword).toHaveBeenCalledWith(
        mockUserInput.password,
        mockUser.password
      );
      expect(mockCreateSession).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe("rate limiting", () => {
    it("should return rate limit error when rate limit is exceeded", async () => {
      mockCheckRateLimit.mockResolvedValue({
        success: false,
        message: "Too many sign-in attempts. Please try again later.",
      });

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "Too many sign-in attempts. Please try again later.",
        error: "Rate limit exceeded",
      });

      expect(mockCheckRateLimit).toHaveBeenCalledWith(
        RATE_LIMIT_CONFIGS.SIGN_IN,
        "sign-in"
      );
      expect(mockValidateCSRFTokenFromRequest).not.toHaveBeenCalled();
      expect(mockGetUserByEmail).not.toHaveBeenCalled();
    });
  });

  describe("CSRF validation", () => {
    it("should return error when CSRF validation fails", async () => {
      mockValidateCSRFTokenFromRequest.mockResolvedValue(false);

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "Invalid request. Please try again.",
        error: "CSRF validation failed",
      });

      expect(mockCheckRateLimit).toHaveBeenCalled();
      expect(mockValidateCSRFTokenFromRequest).toHaveBeenCalledWith(
        mockFormData
      );
      expect(mockGetUserByEmail).not.toHaveBeenCalled();
    });
  });

  describe("validation failures", () => {
    it("should return error when form data validation fails", async () => {
      const invalidFormData = new FormData();
      invalidFormData.append("email", "invalid-email");
      invalidFormData.append("password", "");

      const result = await signInAction(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
      expect(result.errors?.email).toBeDefined();
      expect(result.errors?.password).toBeDefined();
    });

    it("should handle validation failure with missing error details gracefully", async () => {
      const emptyFormData = new FormData();

      const result = await signInAction(emptyFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
    });

    it("should return error when input is not login data", async () => {
      const invalidFormData = new FormData();
      invalidFormData.append("email", "test@example.com");
      // Missing password

      const result = await signInAction(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
    });
  });

  describe("user not found", () => {
    it("should return error when user with email does not exist", async () => {
      mockGetUserByEmail.mockResolvedValue(null);

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "Email or password is incorrect",
        currentValues: mockUserInput,
        errors: {
          email: ["Email or password is incorrect"],
          password: ["Email or password is incorrect"],
        },
      });

      expect(mockGetUserByEmail).toHaveBeenCalledWith(mockUserInput.email);
      expect(mockVerifyPassword).not.toHaveBeenCalled();
      expect(mockCreateSession).not.toHaveBeenCalled();
    });
  });

  describe("password verification", () => {
    it("should return error when password is incorrect", async () => {
      mockVerifyPassword.mockResolvedValue(false);

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "Email or password is incorrect",
        currentValues: mockUserInput,
        errors: {
          email: ["Email or password is incorrect"],
          password: ["Email or password is incorrect"],
        },
      });

      expect(mockVerifyPassword).toHaveBeenCalledWith(
        mockUserInput.password,
        mockUser.password
      );
      expect(mockCreateSession).not.toHaveBeenCalled();
    });
  });

  describe("session creation", () => {
    it("should create session when all validations pass", async () => {
      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result.success).toBe(true);
      expect(mockCreateSession).toHaveBeenCalledWith(mockUser.id);
    });

    it("should handle session creation errors gracefully", async () => {
      mockCreateSession.mockRejectedValue(new Error("Session creation failed"));

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "An error occurred while signing in",
        currentValues: mockUserInput,
        error: "Failed to sign in",
      });

      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign in",
        expect.any(Error)
      );
    });
  });

  describe("error handling", () => {
    it("should handle unexpected errors and log them", async () => {
      mockGetUserByEmail.mockRejectedValue(new Error("Database error"));

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "An error occurred while signing in",
        currentValues: mockUserInput,
        error: "Failed to sign in",
      });

      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign in",
        expect.any(Error)
      );
    });

    it("should handle errors during rate limit check", async () => {
      mockCheckRateLimit.mockRejectedValue(new Error("Rate limit error"));

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("An error occurred while signing in");
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign in",
        expect.any(Error)
      );
    });

    it("should handle errors during CSRF validation", async () => {
      mockValidateCSRFTokenFromRequest.mockRejectedValue(
        new Error("CSRF error")
      );

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("An error occurred while signing in");
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign in",
        expect.any(Error)
      );
    });

    it("should handle errors during user lookup", async () => {
      mockGetUserByEmail.mockRejectedValue(new Error("Database error"));

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result.success).toBe(false);
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign in",
        expect.any(Error)
      );
    });

    it("should handle errors during password verification", async () => {
      mockVerifyPassword.mockRejectedValue(
        new Error("Password verification error")
      );

      const mockFormData = createMockFormData();
      const result = await signInAction(mockFormData);

      expect(result.success).toBe(false);
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign in",
        expect.any(Error)
      );
    });
  });

  describe("edge cases", () => {
    it("should handle empty form data gracefully", async () => {
      const emptyFormData = new FormData();

      const result = await signInAction(emptyFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
    });

    it("should handle malformed form data", async () => {
      const malformedFormData = new FormData();
      malformedFormData.append("email", "not-an-email");
      malformedFormData.append("password", "short");

      const result = await signInAction(malformedFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
    });
  });
});
