import { describe, it, expect, vi, beforeEach } from "vitest";
import { signUpAction } from "./signUp";
import { createSession } from "@/lib/auth/session";
import { createUser, getUserByEmail } from "@/lib/auth/user";
import { validateCSRFTokenFromRequest } from "@/lib/auth/csrf";
import { logAuthError } from "@/lib/logger-utils";
import { checkRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/auth/rateLimit";

// Mock all dependencies
vi.mock("@/lib/auth/session");
vi.mock("@/lib/auth/user");
vi.mock("@/lib/auth/csrf");
vi.mock("@/lib/logger-utils");
vi.mock("@/lib/auth/rateLimit");

const mockCreateSession = vi.mocked(createSession);
const mockCreateUser = vi.mocked(createUser);
const mockGetUserByEmail = vi.mocked(getUserByEmail);
const mockValidateCSRFTokenFromRequest = vi.mocked(
  validateCSRFTokenFromRequest
);
const mockLogAuthError = vi.mocked(logAuthError);
const mockCheckRateLimit = vi.mocked(checkRateLimit);

describe("signUpAction", () => {
  const mockUserInput = {
    email: "test@example.com",
    password: "ValidPass123!",
    name: "Test User",
    role: "USER" as const,
  };

  const mockCreatedUser = {
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
    formData.append("name", mockUserInput.name);
    formData.append("role", mockUserInput.role);
    return formData;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    mockCheckRateLimit.mockResolvedValue({ success: true });
    mockValidateCSRFTokenFromRequest.mockResolvedValue(true);
    mockGetUserByEmail.mockResolvedValue(null); // User doesn't exist
    mockCreateUser.mockResolvedValue(mockCreatedUser);
    mockCreateSession.mockResolvedValue();
  });

  describe("successful sign up", () => {
    it("should successfully create a new user account", async () => {
      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result).toEqual({
        success: true,
        message: "Account created successfully",
      });

      expect(mockCheckRateLimit).toHaveBeenCalledWith(
        RATE_LIMIT_CONFIGS.SIGN_UP,
        "sign-up"
      );
      expect(mockValidateCSRFTokenFromRequest).toHaveBeenCalledWith(
        mockFormData
      );
      expect(mockGetUserByEmail).toHaveBeenCalledWith(mockUserInput.email);
      expect(mockCreateUser).toHaveBeenCalledWith(mockUserInput);
      expect(mockCreateSession).toHaveBeenCalledWith(mockCreatedUser.id);
    });
  });

  describe("rate limiting", () => {
    it("should return rate limit error when rate limit is exceeded", async () => {
      mockCheckRateLimit.mockResolvedValue({
        success: false,
        message: "Too many sign-up attempts. Please try again later.",
      });

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "Too many sign-up attempts. Please try again later.",
        error: "Rate limit exceeded",
      });

      expect(mockCheckRateLimit).toHaveBeenCalledWith(
        RATE_LIMIT_CONFIGS.SIGN_UP,
        "sign-up"
      );
      expect(mockValidateCSRFTokenFromRequest).not.toHaveBeenCalled();
      expect(mockGetUserByEmail).not.toHaveBeenCalled();
    });
  });

  describe("CSRF validation", () => {
    it("should return error when CSRF validation fails", async () => {
      mockValidateCSRFTokenFromRequest.mockResolvedValue(false);

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

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
      invalidFormData.append("password", "123");
      invalidFormData.append("name", "");

      const result = await signUpAction(invalidFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
      expect(result.errors?.email).toBeDefined();
      expect(result.errors?.password).toBeDefined();
      expect(result.errors?.name).toBeDefined();
    });

    it("should handle validation failure with missing error details", async () => {
      const emptyFormData = new FormData();

      const result = await signUpAction(emptyFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
    });
  });

  describe("existing user", () => {
    it("should return error when user with email already exists", async () => {
      mockGetUserByEmail.mockResolvedValue(mockCreatedUser);

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "User with this email already exists",
        currentValues: mockUserInput,
        errors: {
          email: ["User with this email already exists"],
        },
      });

      expect(mockGetUserByEmail).toHaveBeenCalledWith(mockUserInput.email);
      expect(mockCreateUser).not.toHaveBeenCalled();
      expect(mockCreateSession).not.toHaveBeenCalled();
    });
  });

  describe("user creation", () => {
    it("should handle user creation failure", async () => {
      mockCreateUser.mockResolvedValue(null);

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result).toEqual({
        success: false,
        message: "User creation failed",
        currentValues: mockUserInput,
      });

      expect(mockCreateUser).toHaveBeenCalledWith(mockUserInput);
      expect(mockCreateSession).not.toHaveBeenCalled();
    });

    it("should create session when user creation succeeds", async () => {
      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result.success).toBe(true);
      expect(mockCreateUser).toHaveBeenCalledWith(mockUserInput);
      expect(mockCreateSession).toHaveBeenCalledWith(mockCreatedUser.id);
    });
  });

  describe("error handling", () => {
    it("should handle unexpected errors and log them", async () => {
      mockGetUserByEmail.mockRejectedValue(new Error("Database error"));

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result).toEqual({
        success: false,
        currentValues: mockUserInput,
        message: "An error occurred while creating your account",
        error: "Failed to create account",
      });

      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign up",
        expect.any(Error)
      );
    });

    it("should handle errors during rate limit check", async () => {
      mockCheckRateLimit.mockRejectedValue(new Error("Rate limit error"));

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        "An error occurred while creating your account"
      );
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign up",
        expect.any(Error)
      );
    });

    it("should handle errors during CSRF validation", async () => {
      mockValidateCSRFTokenFromRequest.mockRejectedValue(
        new Error("CSRF error")
      );

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        "An error occurred while creating your account"
      );
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign up",
        expect.any(Error)
      );
    });

    it("should handle errors during user lookup", async () => {
      mockGetUserByEmail.mockRejectedValue(new Error("Database error"));

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result.success).toBe(false);
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign up",
        expect.any(Error)
      );
    });

    it("should handle errors during user creation", async () => {
      mockCreateUser.mockRejectedValue(new Error("User creation error"));

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result.success).toBe(false);
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign up",
        expect.any(Error)
      );
    });

    it("should handle errors during session creation", async () => {
      mockCreateSession.mockRejectedValue(new Error("Session error"));

      const mockFormData = createMockFormData();
      const result = await signUpAction(mockFormData);

      expect(result.success).toBe(false);
      expect(mockLogAuthError).toHaveBeenCalledWith(
        "sign up",
        expect.any(Error)
      );
    });
  });

  describe("edge cases", () => {
    it("should handle empty form data gracefully", async () => {
      const emptyFormData = new FormData();

      const result = await signUpAction(emptyFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
    });

    it("should handle malformed form data", async () => {
      const malformedFormData = new FormData();
      malformedFormData.append("email", "not-an-email");
      malformedFormData.append("password", "short");

      const result = await signUpAction(malformedFormData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Validation failed");
      expect(result.errors).toBeDefined();
    });
  });
});
