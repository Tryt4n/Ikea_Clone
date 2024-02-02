import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../setup-test/test-utils";
import ClubInfoDiscount from "./ClubInfoDiscount";
import { getClubDiscount } from "../../../constants/clubDiscount";

describe("ClubInfoDiscount", () => {
  it('should render an anchor element with class "club-info-discount" and href attribute equal to the "href" prop', () => {
    // Arrange
    const price = 100;
    const href = "https://example.com";

    // Act
    render(<ClubInfoDiscount price={price} href={href} />);
    const anchorElement = screen.getByRole("link", {
      name: /Oferty dla Klubowiczów IKEA Family/i,
    });

    // Assert
    expect(anchorElement).toHaveClass("club-info-discount");
    expect(anchorElement).toHaveAttribute("href", href);
  });

  it("should render a text with information about the savings available to IKEA Family Club members in proper format when savings are integer", () => {
    // Arrange
    const price = 60;
    const text = "Dołącz lub zaloguj się i zaoszczędź";
    const savingsMath = getClubDiscount(price);
    const stringifiedSavingsPrice = savingsMath.toLocaleString("pl-PL");

    const formattedPrice = Number.isInteger(savingsMath)
      ? `${stringifiedSavingsPrice},-`
      : `${stringifiedSavingsPrice}`;

    // Act
    render(<ClubInfoDiscount price={price} href="https://example.com" />);
    const savingsText = screen.getByText(
      /Dołącz lub zaloguj się i zaoszczędź/i,
    );

    // Assert
    expect(savingsText).toBeInTheDocument();
    expect(savingsText).toHaveTextContent(`${text} ${formattedPrice}`);
    expect(formattedPrice.endsWith(",-")).toBeTruthy();
  });

  it("should render a text with information about the savings available to IKEA Family Club members in proper format when savings are not integer", () => {
    // Arrange
    const price = 99.99;
    const text = "Dołącz lub zaloguj się i zaoszczędź";
    const savingsMath = getClubDiscount(price);
    const stringifiedSavingsPrice = savingsMath.toLocaleString("pl-PL");

    const formattedPrice = Number.isInteger(savingsMath)
      ? `${stringifiedSavingsPrice},-`
      : `${stringifiedSavingsPrice}`;

    // Act
    render(<ClubInfoDiscount price={price} href="https://example.com" />);
    const savingsText = screen.getByText(
      /Dołącz lub zaloguj się i zaoszczędź/i,
    );

    // Assert
    expect(savingsText).toBeInTheDocument();
    expect(savingsText).toHaveTextContent(`${text} ${formattedPrice}`);
    expect(formattedPrice.endsWith(",-")).toBe(false);
  });
});
