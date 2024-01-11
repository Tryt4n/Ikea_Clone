import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ChangeCountry from "./ChangeCountry";

describe("ChangeCountryBtn", () => {
  it('should render an anchor element with class "change-country"', () => {
    // Arrange
    render(<ChangeCountry href="https://example.com" />);
    const anchorElement = screen.getByRole("link");

    // Assert
    expect(anchorElement).toHaveClass("change-country");
  });

  it('should render a GlobeIcon and a "Zmień kraj" label inside the anchor element', () => {
    // Arrange
    render(<ChangeCountry />);
    const svg = document.querySelector("svg");
    const label = screen.getByText(/zmień kraj/i);

    // Assert
    expect(svg).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it("should pass any additional props to the anchor element", async () => {
    // Arrange
    const onClick = vi.fn();
    render(<ChangeCountry href="https://example.com" onClick={onClick} />);
    const anchorElement = screen.getByRole("link", { name: /zmień kraj/i });
    const user = userEvent.setup();

    // Act
    await user.click(anchorElement);

    // Assert
    expect(onClick).toHaveBeenCalled();
  });
});
