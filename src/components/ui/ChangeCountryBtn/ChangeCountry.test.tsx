import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ChangeCountry from "./ChangeCountry";

describe("ChangeCountryBtn", () => {
  it('should render an anchor element with class "change-country"', () => {
    // Act
    render(<ChangeCountry href="https://example.com" />);
    const anchorElement = screen.getByRole("link");

    // Assert
    expect(anchorElement).toHaveClass("change-country");
  });

  it('should render a GlobeIcon and a "Zmień kraj" label inside the anchor element', () => {
    // Act
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
    const user = userEvent.setup();

    // Act
    render(<ChangeCountry href="https://example.com" onClick={onClick} />);
    const anchorElement = screen.getByRole("link", { name: /zmień kraj/i });

    await user.click(anchorElement);

    // Assert
    expect(onClick).toHaveBeenCalled();
  });
});
