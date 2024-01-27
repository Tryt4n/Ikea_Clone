import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackToTopBtn from "./BackToTopBtn";
import { useInView } from "react-intersection-observer";
import useWindowSize from "../../../hooks/useWindowSize/useWindowSize";

// Mock the useWindowSize hook
vi.mock("../../../hooks/useWindowSize/useWindowSize");

describe("BackToTopBtn", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

    // Mock the useWindowSize hook to return a large window width
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 1024,
    });
  });

  it("renders correctly", () => {
    // Act
    render(<BackToTopBtn />);
    const button = screen.queryByRole("button", { hidden: true });

    let container;
    if (button) {
      container = button.parentNode;
    }

    // Assert
    expect(container).toBeInTheDocument();
  });

  it("should not bet visible on the initial render", () => {
    // Act
    render(<BackToTopBtn />);
    const button = screen.queryByRole("button", { hidden: true });
    let container;
    if (button) {
      container = button.parentNode;
    }

    // Assert
    expect(container).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-hidden", "true");
  });

  it("should be visible when user scrolls down the page", () => {
    // Arrange
    const windowHeight = 1000;
    window.innerHeight = windowHeight;

    // Act
    render(<BackToTopBtn />);
    fireEvent.scroll(window, { target: { scrollY: windowHeight } });
    const button = screen.getByRole("button");

    // Assert
    expect(button).toBeVisible();
    expect(button).toHaveAttribute("aria-hidden", "false");
  });

  it("calls scrollToTop function when it is visible and clicked", async () => {
    // Arrange component visibility state
    const windowHeight = 1000;
    window.innerHeight = windowHeight;

    const user = userEvent.setup();

    // Act
    render(<BackToTopBtn />);

    // Assert that the button is not visible
    let button = screen.getByRole("button", { hidden: true });
    expect(button).toHaveAttribute("aria-hidden", "true");

    // Act scroll the page to make the button visible
    fireEvent.scroll(window, { target: { scrollY: windowHeight } });

    // Assert that the button is visible
    expect(button).toBeVisible();
    expect(button).toHaveAttribute("aria-hidden", "false");

    // Act click the button
    button = screen.getByRole("button");
    await user.click(button);

    // Update window.scrollY to simulate scrolling to the top
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });

    // Update useInView mock to simulate that the button is out of view
    (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      false,
    ]);

    // Simulate a scroll event to trigger a re-render
    fireEvent.scroll(window);

    // Re-assign the button after re-render
    button = screen.getByRole("button", { hidden: true });

    // Assert that the button is again not visible and the scrollTo function was called
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
    expect(button).toHaveAttribute("aria-hidden", "true");
  });

  it(`calls scrollToTop function when it is visible and clicked with "smooth" or "auto" scroll behavior based on user preferences`, async () => {
    // Arrange component visibility state
    const windowHeight = 1000;
    window.innerHeight = windowHeight;
    const userPrefersReducedMotion = true; // Set the user prefers reduced motion to true
    window.matchMedia = vi.fn().mockImplementation(() => {
      return {
        matches: userPrefersReducedMotion,
      };
    });
    const user = userEvent.setup();

    // Act
    render(<BackToTopBtn />);

    // Assert that the button is not visible
    let button = screen.getByRole("button", { hidden: true });
    expect(button).toHaveAttribute("aria-hidden", "true");

    // Act scroll the page to make the button visible
    fireEvent.scroll(window, { target: { scrollY: windowHeight } });

    // Assert that the button is visible
    expect(button).toBeVisible();
    expect(button).toHaveAttribute("aria-hidden", "false");

    // Act click the button
    button = screen.getByRole("button");
    await user.click(button);

    // Update window.scrollY to simulate scrolling to the top
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });

    // Update useInView mock to simulate that the button is out of view
    (useInView as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      vi.fn(),
      false,
    ]);

    // Simulate a scroll event to trigger a re-render
    fireEvent.scroll(window);

    // Re-assign the button after re-render
    button = screen.getByRole("button", { hidden: true });

    // Assert that the button is again not visible and the scrollTo function was called
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: userPrefersReducedMotion ? "auto" : "smooth",
    });
    expect(button).toHaveAttribute("aria-hidden", "true");
  });

  it("should be expanded when is hovered", async () => {
    // Arrange
    const windowHeight = 1000;
    window.innerHeight = windowHeight;
    const user = userEvent.setup();

    // Act
    render(<BackToTopBtn />);
    fireEvent.scroll(window, { target: { scrollY: windowHeight } });
    const button = screen.getByRole("button");
    const text = screen.getByText(/Powrót do góry/i);
    const textWrapper = text.parentNode;
    const textWrapperHiddenClass = "back-to-top-btn__text-wrapper--hidden";

    // Assert
    expect(button).toBeVisible();
    expect(button).toHaveAttribute("aria-hidden", "false");
    expect(textWrapper).toHaveClass(textWrapperHiddenClass);

    // Act hover the button
    await user.hover(button);

    // Assert that the text is visible
    expect(textWrapper).not.toHaveClass(textWrapperHiddenClass);

    // Act unhover the button
    await user.unhover(button);

    // Assert that the text is hidden
    expect(textWrapper).toHaveClass(textWrapperHiddenClass);
  });

  it("renders the BackToTopBtn component and checks if it is displayed statically below 600px", () => {
    // Arrange
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 500,
    });

    // Act
    render(<BackToTopBtn />);
    const button = screen.getByRole("button");
    const text = screen.getByText(/Powrót do góry/i);
    const textWrapper = text.parentNode;

    // Assert
    expect(button).toHaveClass("btn--light");
    expect(button).not.toHaveAttribute("aria-hidden", "true");
    expect(button).not.toHaveAttribute("aria-hidden", "false");

    expect(textWrapper).not.toHaveClass(
      "back-to-top-btn__text-wrapper--hidden",
    );
  });
});
