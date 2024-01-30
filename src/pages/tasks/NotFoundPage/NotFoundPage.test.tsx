import { describe, expect, it } from "vitest";
import { render, screen } from "../../../setup-test/test-utils";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("should render error page component", () => {
    // Act
    render(<NotFoundPage />);

    // Assert
    expect(screen.getByText(/coś poszło nie tak/i)).toBeInTheDocument();
  });
});
