import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import LoginBtn from "./LoginBtn";

describe("LoginBtn", () => {
  it('should render a button with an AvatarIcon and "Hej! Zaloguj się" text', () => {
    // Act
    render(<LoginBtn />);
    const button = screen.getByRole("button");
    const svg = document.querySelector("svg");
    const text = screen.getByText(/hej! zaloguj się/i);

    // Assert
    expect(button).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("should have visually hidden text when the 'short' prop is true", () => {
    // Act
    render(<LoginBtn short />);
    const text = screen.getByText(/hej! zaloguj się/i);

    // Assert
    expect(text).toHaveClass("visually-hidden");
  });

  it("should open the login modal when clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<LoginBtn />);
    const button = screen.getByRole("button");
    const modal = screen.getByTestId("modal");

    await user.click(button);
    const modalHeader = screen.queryByRole("heading", {
      name: "Zaloguj się",
      level: 2,
      hidden: true,
    });

    // Assert
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("side-modal show");
    expect(modalHeader).toBeInTheDocument();
  });
});
