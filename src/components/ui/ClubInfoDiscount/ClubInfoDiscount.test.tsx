import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import ClubInfoDiscount from "./ClubInfoDiscount";

describe("ClubInfoDiscount", () => {
  it('should render an anchor element with class "club-info-discount" and href attribute equal to the "href" prop', () => {
    // Arrange
    const price = 100;
    const href = "https://example.com";
    render(<ClubInfoDiscount price={price} href={href} />);

    const anchorElement = screen.getByRole("link", {
      name: /Oferty dla Klubowiczów IKEA Family/i,
    });

    // Assert
    expect(anchorElement).toHaveClass("club-info-discount");
    expect(anchorElement).toHaveAttribute("href", href);
  });

  it("should render a text with information about the savings available to IKEA Family Club members", () => {
    // Arrange
    const price = 100;
    render(<ClubInfoDiscount price={price} href="https://example.com" />);

    const savingsText = screen.getByText(
      /Dołącz lub zaloguj się i zaoszczędź/i
    );

    // Assert
    expect(savingsText).toBeInTheDocument();
  });
});
