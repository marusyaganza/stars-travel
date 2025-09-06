// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ActionButton } from "./ActionButton";
import { cancelBooking } from "@/actions/flights/cancelBooking";
import { bookFlight } from "@/actions/flights/bookFlight";
import toast from "react-hot-toast";

// Mock the action functions
vi.mock("@/actions/flights/cancelBooking", () => ({
  cancelBooking: vi.fn(),
}));

vi.mock("@/actions/flights/bookFlight", () => ({
  bookFlight: vi.fn(),
}));

vi.mock("react-hot-toast");

// Mock React's useTransition hook
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useTransition: vi.fn(() => [false, vi.fn((callback) => callback())]),
  };
});

describe("ActionButton", () => {
  const mockCancelFlight = vi.mocked(cancelBooking);
  const mockBookFlight = vi.mocked(bookFlight);
  const mockToast = vi.mocked(toast);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders Cancel button with correct text", () => {
      render(<ActionButton operation="Cancel" flightId="flight-123" />);

      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();
    });

    it("renders Book button with correct text", () => {
      render(<ActionButton operation="Book" flightId="flight-123" />);

      expect(screen.getByRole("button", { name: "Book" })).toBeInTheDocument();
    });

    it("applies custom className when provided", () => {
      render(
        <ActionButton
          operation="Cancel"
          flightId="flight-123"
          className="custom-class"
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("passes through additional props to Button component", () => {
      render(
        <ActionButton
          operation="Cancel"
          flightId="flight-123"
          disabled={true}
          data-testid="action-button"
        />
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("data-testid", "action-button");
    });
  });

  describe("Cancel Operation", () => {
    it("calls cancelFlight with correct flightId when Cancel button is clicked", async () => {
      mockCancelFlight.mockResolvedValueOnce({
        success: true,
        message: "Cancelled",
      });

      render(<ActionButton operation="Cancel" flightId="flight-123" />);

      const button = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockCancelFlight).toHaveBeenCalledWith("flight-123");
        expect(mockCancelFlight).toHaveBeenCalledTimes(1);
      });
    });

    it("shows success toast when cancelFlight succeeds", async () => {
      mockCancelFlight.mockResolvedValueOnce({
        success: true,
        message: "Booking cancelled successfully",
      });

      render(<ActionButton operation="Cancel" flightId="flight-123" />);

      const button = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith(
          "Booking cancelled successfully"
        );
      });
    });

    it("shows error toast when cancelFlight fails", async () => {
      mockCancelFlight.mockResolvedValueOnce({
        success: false,
        message: "Operation failed",
      });

      render(<ActionButton operation="Cancel" flightId="flight-123" />);

      const button = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith("Operation failed");
      });
    });

    it("does not call bookFlight when Cancel operation is clicked", async () => {
      mockCancelFlight.mockResolvedValueOnce({
        success: true,
        message: "Cancelled",
      });

      render(<ActionButton operation="Cancel" flightId="flight-123" />);

      const button = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockBookFlight).not.toHaveBeenCalled();
      });
    });
  });

  describe("Book Operation", () => {
    it("calls bookFlight with correct flightId when Book button is clicked", async () => {
      mockBookFlight.mockResolvedValueOnce({
        success: true,
        message: "Booked",
      });

      render(<ActionButton operation="Book" flightId="flight-456" />);

      const button = screen.getByRole("button", { name: "Book" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockBookFlight).toHaveBeenCalledWith("flight-456");
        expect(mockBookFlight).toHaveBeenCalledTimes(1);
      });
    });

    it("shows success toast when bookFlight succeeds", async () => {
      mockBookFlight.mockResolvedValueOnce({
        success: true,
        message: "Booked successfully",
      });

      render(<ActionButton operation="Book" flightId="flight-456" />);

      const button = screen.getByRole("button", { name: "Book" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith("Booked successfully");
      });
    });

    it("shows error toast when bookFlight fails", async () => {
      mockBookFlight.mockResolvedValueOnce({
        success: false,
        message: "Booking failed",
      });

      render(<ActionButton operation="Book" flightId="flight-456" />);

      const button = screen.getByRole("button", { name: "Book" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith("Booking failed");
      });
    });

    it("does not call cancelFlight when Book operation is clicked", async () => {
      mockBookFlight.mockResolvedValueOnce({
        success: true,
        message: "Booked",
      });

      render(<ActionButton operation="Book" flightId="flight-456" />);

      const button = screen.getByRole("button", { name: "Book" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockCancelFlight).not.toHaveBeenCalled();
      });
    });
  });

  describe("Error Handling", () => {
    it("handles cancelFlight errors gracefully", async () => {
      mockCancelFlight.mockRejectedValueOnce(new Error("Network error"));

      render(<ActionButton operation="Cancel" flightId="flight-123" />);

      const button = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockCancelFlight).toHaveBeenCalledWith("flight-123");
        expect(mockToast.error).toHaveBeenCalledWith(
          "An unexpected error occurred"
        );
      });

      // The component should not crash when the action fails
      expect(button).toBeInTheDocument();
    });

    it("handles bookFlight errors gracefully", async () => {
      mockBookFlight.mockRejectedValueOnce(new Error("Database error"));

      render(<ActionButton operation="Book" flightId="flight-456" />);

      const button = screen.getByRole("button", { name: "Book" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockBookFlight).toHaveBeenCalledWith("flight-456");
        expect(mockToast.error).toHaveBeenCalledWith(
          "An unexpected error occurred"
        );
      });

      // The component should not crash when the action fails
      expect(button).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with different flightId values", async () => {
      mockCancelFlight.mockResolvedValue({
        success: true,
        message: "Cancelled",
      });

      const { rerender } = render(
        <ActionButton operation="Cancel" flightId="flight-abc" />
      );

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(mockCancelFlight).toHaveBeenCalledWith("flight-abc");
      });

      // Test with different flightId
      rerender(<ActionButton operation="Cancel" flightId="flight-xyz" />);

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(mockCancelFlight).toHaveBeenCalledWith("flight-xyz");
        expect(mockCancelFlight).toHaveBeenCalledTimes(2);
      });
    });

    it("handles multiple rapid clicks by calling the action multiple times", async () => {
      mockBookFlight.mockResolvedValue({ success: true, message: "Booked" });

      render(<ActionButton operation="Book" flightId="flight-123" />);

      const button = screen.getByRole("button");

      // Click multiple times rapidly
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      await waitFor(() => {
        // With our mock setup, each click triggers the action
        expect(mockBookFlight).toHaveBeenCalledTimes(3);
        expect(mockBookFlight).toHaveBeenCalledWith("flight-123");
      });
    });
  });

  describe("Props Validation", () => {
    it("handles empty flightId", async () => {
      mockCancelFlight.mockResolvedValueOnce({
        success: true,
        message: "Cancelled",
      });

      render(<ActionButton operation="Cancel" flightId="" />);

      const button = screen.getByRole("button", { name: "Cancel" });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockCancelFlight).toHaveBeenCalledWith("");
      });
    });

    it("renders with both operation types", () => {
      const { rerender } = render(
        <ActionButton operation="Cancel" flightId="test-id" />
      );

      expect(
        screen.getByRole("button", { name: "Cancel" })
      ).toBeInTheDocument();

      rerender(<ActionButton operation="Book" flightId="test-id" />);

      expect(screen.getByRole("button", { name: "Book" })).toBeInTheDocument();
    });
  });
});
