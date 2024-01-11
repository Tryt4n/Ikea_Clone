import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import HamburgerButton from "./HamburgerButton";

describe("HamburgerButton", () => {
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
});
