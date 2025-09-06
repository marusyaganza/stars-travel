import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { toast } from "react-hot-toast";
import { AuthButton } from "./AuthButton";

// Mock dependencies
vi.mock("@/actions/auth/checkAuth", () => ({
  checkAuth: vi.fn(),
}));

vi.mock("@/actions/auth/signOut", () => ({
  signOut: vi.fn(),
}));

vi.mock("@/lib/hooks", () => ({
  useCSRFToken: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    ...props
  }: React.ComponentProps<"a"> & { href: string }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

// Import mocked functions
import { checkAuth } from "@/actions/auth/checkAuth";
import { signOut } from "@/actions/auth/signOut";
import { useCSRFToken } from "@/lib/hooks";

const mockCheckAuth = vi.mocked(checkAuth);
const mockSignOut = vi.mocked(signOut);
const mockUseCSRFToken = vi.mocked(useCSRFToken);
const mockToastError = vi.mocked(toast.error);

describe("AuthButton", () => {
  const mockCSRFToken = "test-csrf-token";

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCSRFToken.mockReturnValue({
      csrfToken: mockCSRFToken,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      mockCheckAuth.mockResolvedValue(true);
    });

    it("should render sign out button with correct text", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /log out/i })
        ).toBeInTheDocument();
      });
    });

    it("should render sign out button with correct classes", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button.className).toContain("authButton");
        expect(button.className).toContain("button");
      });
    });

    it("should apply custom className when provided", async () => {
      const customClass = "custom-class";
      render(<AuthButton className={customClass} />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button.className).toContain("authButton");
        expect(button.className).toContain("button");
        expect(button.className).toContain(customClass);
      });
    });

    it("should include CSRF token in form", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const csrfInput = screen.getByDisplayValue(mockCSRFToken);
        expect(csrfInput).toBeInTheDocument();
        expect(csrfInput).toHaveAttribute("name", "csrf_token");
        expect(csrfInput).toHaveAttribute("type", "hidden");
      });
    });

    it("should show loading state when sign out is pending", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button).not.toBeDisabled();
      });

      // Simulate form submission to trigger pending state
      const form = screen
        .getByRole("button", { name: /log out/i })
        .closest("form");
      expect(form).toBeInTheDocument();

      fireEvent.submit(form!);

      // The button should show loading text and be disabled
      await waitFor(() => {
        const button = screen.getByRole("button", { name: /\.\.\.loading/i });
        expect(button).toBeDisabled();
      });
    });

    it("should call signOut action when form is submitted", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button).toBeInTheDocument();
      });

      const form = screen
        .getByRole("button", { name: /log out/i })
        .closest("form");
      fireEvent.submit(form!);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledWith(expect.any(FormData));
      });
    });

    it("should create FormData with CSRF token when submitting", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button).toBeInTheDocument();
      });

      const form = screen
        .getByRole("button", { name: /log out/i })
        .closest("form");
      fireEvent.submit(form!);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledWith(
          expect.objectContaining({
            get: expect.any(Function),
          })
        );
      });

      // Verify the FormData contains the CSRF token
      const formData = mockSignOut.mock.calls[0][0] as FormData;
      expect(formData.get("csrf_token")).toBe(mockCSRFToken);
    });
  });

  describe("when user is not authenticated", () => {
    beforeEach(() => {
      mockCheckAuth.mockResolvedValue(false);
    });

    it("should render sign in link with correct text", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        expect(
          screen.getByRole("link", { name: /sign in/i })
        ).toBeInTheDocument();
      });
    });

    it("should render sign in link with correct href", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const link = screen.getByRole("link", { name: /sign in/i });
        expect(link).toHaveAttribute("href", "/signin");
      });
    });

    it("should render sign in link with correct classes", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const link = screen.getByRole("link", { name: /sign in/i });
        expect(link.className).toContain("authButton");
        expect(link.className).toContain("link");
      });
    });

    it("should apply custom className when provided", async () => {
      const customClass = "custom-class";
      render(<AuthButton className={customClass} />);

      await waitFor(() => {
        const link = screen.getByRole("link", { name: /sign in/i });
        expect(link.className).toContain("authButton");
        expect(link.className).toContain("link");
        expect(link.className).toContain(customClass);
      });
    });

    it("should include test id for sign in button", async () => {
      render(<AuthButton />);

      await waitFor(() => {
        const link = screen.getByTestId("header-signin-button");
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe("authentication status checking", () => {
    it("should call checkAuth on mount", async () => {
      mockCheckAuth.mockResolvedValue(false);
      render(<AuthButton />);

      await waitFor(() => {
        expect(mockCheckAuth).toHaveBeenCalledTimes(1);
      });
    });

    it("should handle checkAuth errors gracefully", async () => {
      mockCheckAuth.mockRejectedValue(new Error("Network error"));
      render(<AuthButton />);

      await waitFor(() => {
        expect(mockToastError).toHaveBeenCalledWith(
          "Failed to check authentication status"
        );
      });

      // Should still render sign in link when auth check fails
      await waitFor(() => {
        expect(
          screen.getByRole("link", { name: /sign in/i })
        ).toBeInTheDocument();
      });
    });

    it("should not update state if component unmounts during auth check", async () => {
      let resolveAuth: (value: boolean) => void;
      const authPromise = new Promise<boolean>((resolve) => {
        resolveAuth = resolve;
      });
      mockCheckAuth.mockReturnValue(authPromise);

      const { unmount } = render(<AuthButton />);

      // Unmount before auth check completes
      unmount();

      // Resolve the promise after unmount
      resolveAuth!(true);

      // Wait a bit to ensure no state updates occur
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should not have called toast.error since component was unmounted
      expect(mockToastError).not.toHaveBeenCalled();
    });
  });

  describe("CSRF token integration", () => {
    it("should handle CSRF token loading state", async () => {
      mockUseCSRFToken.mockReturnValue({
        csrfToken: "",
        isLoading: true,
        error: null,
        refetch: vi.fn(),
      });
      mockCheckAuth.mockResolvedValue(true);

      render(<AuthButton />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button).toBeInTheDocument();
      });

      // CSRF input should be present but empty
      const csrfInput = screen.getByDisplayValue("");
      expect(csrfInput).toBeInTheDocument();
    });

    it("should handle CSRF token error state", async () => {
      mockUseCSRFToken.mockReturnValue({
        csrfToken: "",
        isLoading: false,
        error: "CSRF token fetch failed",
        refetch: vi.fn(),
      });
      mockCheckAuth.mockResolvedValue(true);

      render(<AuthButton />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button).toBeInTheDocument();
      });

      // CSRF input should be present but empty
      const csrfInput = screen.getByDisplayValue("");
      expect(csrfInput).toBeInTheDocument();
    });
  });

  describe("component props", () => {
    it("should render without className prop", async () => {
      mockCheckAuth.mockResolvedValue(false);
      render(<AuthButton />);

      await waitFor(() => {
        const link = screen.getByRole("link", { name: /sign in/i });
        expect(link.className).toContain("authButton");
        expect(link.className).toContain("link");
        expect(link.className).not.toContain("undefined");
      });
    });

    it("should handle empty className prop", async () => {
      mockCheckAuth.mockResolvedValue(false);
      render(<AuthButton className="" />);

      await waitFor(() => {
        const link = screen.getByRole("link", { name: /sign in/i });
        expect(link.className).toContain("authButton");
        expect(link.className).toContain("link");
      });
    });
  });

  describe("transition states", () => {
    it("should handle multiple rapid form submissions", async () => {
      mockCheckAuth.mockResolvedValue(true);
      render(<AuthButton />);

      await waitFor(() => {
        const button = screen.getByRole("button", { name: /log out/i });
        expect(button).toBeInTheDocument();
      });

      const form = screen
        .getByRole("button", { name: /log out/i })
        .closest("form");

      // Submit form multiple times rapidly
      fireEvent.submit(form!);
      fireEvent.submit(form!);
      fireEvent.submit(form!);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalledTimes(3);
      });
    });
  });
});
