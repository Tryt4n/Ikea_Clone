import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { ListCreation } from "./ListCreation";

describe("ListCreation", () => {
  it("should render a component", () => {
    // Act
    render(<ListCreation />);

    const component = screen.getByRole("heading", { level: 3 }).parentElement;

    // Assert
    expect(component).toBeInTheDocument();
  });

  it("should open creation list modal when the button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ListCreation />);
    const button = screen.getByRole("button", { name: "Stwórz listę" });
    const modal = screen.getByTestId("modal");

    await user.click(button);

    const modalHeading = screen.getByRole("heading", {
      name: "Nadaj swojej liście nazwę",
      hidden: true,
    });

    // Assert
    expect(modal).toBeInTheDocument();
    expect(modalHeading).toBeInTheDocument();
  });
});
