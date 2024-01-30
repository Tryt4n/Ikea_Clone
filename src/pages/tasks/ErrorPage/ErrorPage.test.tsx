import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../setup-test/test-utils";
import ErrorPage from "./ErrorPage";
import { useRouteError } from "react-router-dom";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useRouteError: vi.fn(),
}));

describe("ErrorPage", () => {
  it("should render error page component", () => {
    // Arrange
    const error = {
      message: "some message",
      stack: "some stack",
    };

    (useRouteError as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      error,
    );

    // Act
    render(<ErrorPage />);

    // Assert
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
