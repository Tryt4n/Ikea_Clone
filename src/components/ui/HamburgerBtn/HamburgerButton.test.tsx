import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import HamburgerButton from "./HamburgerButton";
import useWindowSize from "../../../hooks/useWindowSize/useWindowSize";

// Mock the useWindowSize hook
vi.mock("../../../hooks/useWindowSize/useWindowSize");

describe("HamburgerButton", () => {
  beforeEach(() => {
    // Mock the useWindowSize hook to return a large window width
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 1200,
    });
  });

  it(`should render a button with a hamburger icon and a "Menu" label"`, () => {
    // Act
    render(<HamburgerButton />);
    const button = screen.getByRole("button", { name: "Otwórz Menu" });
    const icon = document.querySelector("svg");
    const label = screen.getByText(/menu/i);

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Otwórz Menu");
    expect(icon).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it(`should open the menu modal when clicked with "menu-modal" class`, async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<HamburgerButton />);
    const button = screen.getByRole("button", { name: "Otwórz Menu" });
    const modal = screen.getByTestId("modal");

    await user.click(button);

    // Assert
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("menu-modal show");
  });

  it("should render a button with additional class if provided", () => {
    // Arrange
    const additionalWrapperClass = "additional-wrapper-class";

    // Act
    render(<HamburgerButton className={additionalWrapperClass} />);
    const button = screen.getByRole("button", { name: "Otwórz Menu" });
    const container = button.parentElement;

    // Assert
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(additionalWrapperClass);
  });

  it("should not hide the text inside the button if the window width is at lest 1200px", () => {
    // Act
    render(<HamburgerButton />);
    const textElement = screen.getByText("Menu");

    // Assert
    expect(textElement).toBeInTheDocument();
    expect(textElement).not.toHaveClass("visually-hidden");
  });

  it("should hide the text inside the button if the window width is less than 1200px", () => {
    // Arrange
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      width: 1199,
    });

    // Act
    render(<HamburgerButton />);
    const textElement = screen.getByText("Menu");

    // Assert
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("visually-hidden");
  });
});
