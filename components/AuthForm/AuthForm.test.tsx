import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { AuthForm, AuthFormProps, AuthFormField } from "./AuthForm";

// Mock child components
vi.mock("../Input/Input", () => ({
  Input: ({
    children,
    name,
    defaultValue,
    disabled,
    ...props
  }: React.ComponentProps<"input"> & {
    children?: React.ReactNode;
    name: string;
  }) => (
    <label data-testid={`input-${name}`}>
      {children}
      <input
        name={name}
        defaultValue={defaultValue || ""}
        disabled={disabled}
        data-testid={`input-field-${name}`}
        {...props}
      />
    </label>
  ),
}));

vi.mock("../Button/Button", () => ({
  Button: ({
    children,
    type,
    disabled,
    size,
    ...props
  }: React.ComponentProps<"button"> & { size?: string }) => (
    <button
      type={type}
      disabled={disabled}
      data-testid="submit-button"
      data-size={size}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock("../FormError/FormError", () => ({
  FormError: ({ errors }: { errors?: string[] }) => (
    <div data-testid={`form-error-${Math.random().toString(36).substr(2, 9)}`}>
      {errors?.map((error: string, index: number) => (
        <p key={index} data-testid={`error-${index}`}>
          {error}
        </p>
      ))}
    </div>
  ),
}));

describe("AuthForm", () => {
  const mockAction = vi.fn();
  const mockCSRFToken = "test-csrf-token";

  const defaultFields: AuthFormField[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
    },
  ];

  const defaultProps: AuthFormProps = {
    fields: defaultFields,
    buttonText: "Submit",
    csrfToken: mockCSRFToken,
    action: mockAction,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("form rendering", () => {
    it("should render form with correct structure", () => {
      render(<AuthForm {...defaultProps} />);

      const form = screen.getByTestId("auth-form");
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute("action");
    });

    it("should render form with custom className", () => {
      const customClass = "custom-form-class";
      render(<AuthForm {...defaultProps} className={customClass} />);

      const form = screen.getByTestId("auth-form");
      expect(form.className).toContain("form");
      expect(form.className).toContain(customClass);
    });

    it("should render form with custom id", () => {
      const customId = "custom-form-id";
      render(<AuthForm {...defaultProps} id={customId} />);

      const form = screen.getByTestId("auth-form");
      expect(form).toHaveAttribute("id", customId);
    });

    it("should render CSRF token as hidden input", () => {
      render(<AuthForm {...defaultProps} />);

      const csrfInput = screen.getByDisplayValue(mockCSRFToken);
      expect(csrfInput).toBeInTheDocument();
      expect(csrfInput).toHaveAttribute("type", "hidden");
      expect(csrfInput).toHaveAttribute("name", "csrf_token");
    });

    it("should render CSRF token when provided as empty string", () => {
      render(<AuthForm {...defaultProps} csrfToken="" />);

      const form = screen.getByTestId("auth-form");
      const csrfInput = form.querySelector('input[name="csrf_token"]');
      expect(csrfInput).toBeInTheDocument();
      expect(csrfInput).toHaveAttribute("type", "hidden");
    });

    it("should render CSRF token when provided as undefined", () => {
      render(<AuthForm {...defaultProps} csrfToken={undefined} />);

      const form = screen.getByTestId("auth-form");
      const csrfInput = form.querySelector('input[name="csrf_token"]');
      expect(csrfInput).toBeInTheDocument();
      expect(csrfInput).toHaveAttribute("type", "hidden");
    });
  });

  describe("field rendering", () => {
    it("should render all fields with correct labels and names", () => {
      render(<AuthForm {...defaultProps} />);

      expect(screen.getByTestId("input-email")).toBeInTheDocument();
      expect(screen.getByTestId("input-password")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-email")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-password")).toBeInTheDocument();
    });

    it("should render fields with correct input types", () => {
      render(<AuthForm {...defaultProps} />);

      const emailInput = screen.getByTestId("input-field-email");
      const passwordInput = screen.getByTestId("input-field-password");

      expect(emailInput).toHaveAttribute("type", "email");
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("should render fields with additional props", () => {
      const fieldsWithProps: AuthFormField[] = [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "Enter username",
          required: true,
        },
      ];

      render(<AuthForm {...defaultProps} fields={fieldsWithProps} />);

      const usernameInput = screen.getByTestId("input-field-username");
      expect(usernameInput).toHaveAttribute("placeholder", "Enter username");
      expect(usernameInput).toHaveAttribute("required");
    });

    it("should render single field form", () => {
      const singleField: AuthFormField[] = [
        {
          name: "email",
          label: "Email",
          type: "email",
        },
      ];

      render(<AuthForm {...defaultProps} fields={singleField} />);

      expect(screen.getByTestId("input-email")).toBeInTheDocument();
      expect(screen.queryByTestId("input-password")).not.toBeInTheDocument();
    });

    it("should render empty fields array", () => {
      render(<AuthForm {...defaultProps} fields={[]} />);

      expect(screen.getByTestId("auth-form")).toBeInTheDocument();
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });
  });

  describe("current values handling", () => {
    it("should set default values for fields", () => {
      const currentValues = {
        email: "test@example.com",
        password: "password123",
      };

      render(<AuthForm {...defaultProps} currentValues={currentValues} />);

      expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("password123")).toBeInTheDocument();
    });

    it("should handle partial current values", () => {
      const currentValues = {
        email: "test@example.com",
      };

      render(<AuthForm {...defaultProps} currentValues={currentValues} />);

      expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-password")).toBeInTheDocument();
    });

    it("should handle empty current values", () => {
      render(<AuthForm {...defaultProps} currentValues={{}} />);

      const emailInput = screen.getByTestId("input-field-email");
      const passwordInput = screen.getByTestId("input-field-password");

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it("should handle undefined current values", () => {
      render(<AuthForm {...defaultProps} currentValues={undefined} />);

      const emailInput = screen.getByTestId("input-field-email");
      const passwordInput = screen.getByTestId("input-field-password");

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("should display field errors", () => {
      const errors = {
        email: ["Email is required", "Email format is invalid"],
        password: ["Password is too short"],
      };

      render(<AuthForm {...defaultProps} errors={errors} />);

      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Email format is invalid")).toBeInTheDocument();
      expect(screen.getByText("Password is too short")).toBeInTheDocument();
    });

    it("should display single field error", () => {
      const errors = {
        email: ["Email is required"],
      };

      render(<AuthForm {...defaultProps} errors={errors} />);

      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });

    it("should handle empty errors object", () => {
      render(<AuthForm {...defaultProps} errors={{}} />);

      const form = screen.getByTestId("auth-form");
      expect(form).toBeInTheDocument();
    });

    it("should handle undefined errors", () => {
      render(<AuthForm {...defaultProps} errors={undefined} />);

      const form = screen.getByTestId("auth-form");
      expect(form).toBeInTheDocument();
    });

    it("should handle empty error arrays", () => {
      const errors = {
        email: [],
        password: [],
      };

      render(<AuthForm {...defaultProps} errors={errors} />);

      const form = screen.getByTestId("auth-form");
      expect(form).toBeInTheDocument();
    });
  });

  describe("loading states", () => {
    it("should disable inputs when loading", () => {
      render(<AuthForm {...defaultProps} isLoading={true} />);

      const emailInput = screen.getByTestId("input-field-email");
      const passwordInput = screen.getByTestId("input-field-password");
      const submitButton = screen.getByTestId("submit-button");

      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });

    it("should enable inputs when not loading", () => {
      render(<AuthForm {...defaultProps} isLoading={false} />);

      const emailInput = screen.getByTestId("input-field-email");
      const passwordInput = screen.getByTestId("input-field-password");
      const submitButton = screen.getByTestId("submit-button");

      expect(emailInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });

    it("should handle undefined loading state", () => {
      render(<AuthForm {...defaultProps} isLoading={undefined} />);

      const emailInput = screen.getByTestId("input-field-email");
      const passwordInput = screen.getByTestId("input-field-password");
      const submitButton = screen.getByTestId("submit-button");

      expect(emailInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("button rendering", () => {
    it("should render submit button with correct text", () => {
      render(<AuthForm {...defaultProps} buttonText="Sign In" />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveTextContent("Sign In");
    });

    it("should render submit button with default text when not provided", () => {
      render(<AuthForm {...defaultProps} buttonText={undefined} />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveTextContent("");
    });

    it("should render submit button with correct size", () => {
      render(<AuthForm {...defaultProps} />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveAttribute("data-size", "M");
    });

    it("should render submit button with correct type", () => {
      render(<AuthForm {...defaultProps} />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });

  describe("children rendering", () => {
    it("should render children between fields and button", () => {
      render(
        <AuthForm {...defaultProps}>
          <div data-testid="custom-child">Custom content</div>
        </AuthForm>
      );

      expect(screen.getByTestId("custom-child")).toBeInTheDocument();
      expect(screen.getByText("Custom content")).toBeInTheDocument();
    });

    it("should render multiple children", () => {
      render(
        <AuthForm {...defaultProps}>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </AuthForm>
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });

    it("should render without children", () => {
      render(<AuthForm {...defaultProps} />);

      expect(screen.getByTestId("auth-form")).toBeInTheDocument();
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    it("should call action when form is submitted", () => {
      render(<AuthForm {...defaultProps} />);

      const form = screen.getByTestId("auth-form");
      fireEvent.submit(form);

      expect(mockAction).toHaveBeenCalledTimes(1);
      expect(mockAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    it("should handle form submission without action", () => {
      render(<AuthForm {...defaultProps} action={undefined} />);

      const form = screen.getByTestId("auth-form");

      // Should not throw error when submitting without action
      expect(() => fireEvent.submit(form)).not.toThrow();
    });

    it("should pass additional form props", () => {
      render(
        <AuthForm
          {...defaultProps}
          data-custom="custom-value"
          aria-label="Login form"
        />
      );

      const form = screen.getByTestId("auth-form");
      expect(form).toHaveAttribute("data-custom", "custom-value");
      expect(form).toHaveAttribute("aria-label", "Login form");
    });
  });

  describe("edge cases", () => {
    it("should handle fields with special characters in names", () => {
      const specialFields: AuthFormField[] = [
        {
          name: "user-name",
          label: "User Name",
          type: "text",
        },
        {
          name: "user_email",
          label: "User Email",
          type: "email",
        },
      ];

      render(<AuthForm {...defaultProps} fields={specialFields} />);

      expect(screen.getByTestId("input-user-name")).toBeInTheDocument();
      expect(screen.getByTestId("input-user_email")).toBeInTheDocument();
    });

    it("should handle fields with duplicate names", () => {
      const duplicateFields: AuthFormField[] = [
        {
          name: "email",
          label: "Email",
          type: "email",
        },
        {
          name: "email",
          label: "Confirm Email",
          type: "email",
        },
      ];

      render(<AuthForm {...defaultProps} fields={duplicateFields} />);

      const emailInputs = screen.getAllByTestId("input-field-email");
      expect(emailInputs).toHaveLength(2);
    });

    it("should handle very long field names and labels", () => {
      const longFields: AuthFormField[] = [
        {
          name: "very-long-field-name-that-might-cause-issues",
          label: "Very Long Field Label That Might Cause Issues With Layout",
          type: "text",
        },
      ];

      render(<AuthForm {...defaultProps} fields={longFields} />);

      expect(
        screen.getByTestId("input-very-long-field-name-that-might-cause-issues")
      ).toBeInTheDocument();
    });
  });
});
