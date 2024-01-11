import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import HamburgerButton from "./HamburgerButton";

describe("HamburgerButton", () => {
  beforeEach(() => {
    // Mock the showModal and close methods of HTMLDialogElement
    window.HTMLDialogElement.prototype.showModal = vi.fn();
    window.HTMLDialogElement.prototype.close = vi.fn();
  });

  // Restore all mocks
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it(`should render a button with a hamburger icon and a "Menu" label"`, () => {
    // Arrange
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
    render(<HamburgerButton />);
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Otwórz Menu" });
    const modal = screen.getByTestId("modal");

    // Act
    await user.click(button);

    // Assert
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("menu-modal show");
  });
});
