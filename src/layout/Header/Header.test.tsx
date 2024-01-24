import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../setup-test/test-utils";
import Header from "./Header";
import { useInView } from "react-intersection-observer";

describe("Header", () => {
  it("should render properly hamburger button if width is at least 1200px", () => {
    // Arrange
    window.innerWidth = 1200;

    // Act
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: /otwórz menu/i,
    });

    // Assert
    expect(hamburgerButton).toBeInTheDocument();

    expect(hamburgerButton.parentElement).toHaveClass("fixed");
  });

  it("should render hamburger button without `fixed` class if header is in view", () => {
    // Arrange
    (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      true,
    ]);

    // Act
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: /otwórz menu/i,
    });

    screen.debug();

    // Assert
    expect(hamburgerButton.parentElement).not.toHaveClass("fixed");
  });
});
