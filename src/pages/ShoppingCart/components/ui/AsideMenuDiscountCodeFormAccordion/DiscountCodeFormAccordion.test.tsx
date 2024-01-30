import { render, screen } from "../../../../../setup-test/test-utils";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { DiscountCodeFormAccordion } from "./DiscountCodeFormAccordion";

describe("ShoppingCart aside menu DiscountCodeFormAccordion", () => {
  it("should open accordion", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<DiscountCodeFormAccordion />);

    const openAccordionBtn = screen.getByRole("button", {
      name: /masz kod rabatowy/i,
    });
    const form = screen.getByTestId("discount-code-form");
    const input = screen.getByRole("textbox", { hidden: true });
    const accordionBtn = screen.getByRole("button", {
      name: /zastosuj/i,
      hidden: true,
    });

    // Assert
    expect(form).toHaveAttribute("aria-hidden", "true");
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(accordionBtn).toHaveAttribute("tabindex", "-1");

    // Act - open accordion
    await user.click(openAccordionBtn);

    // Assert - accordion should be open
    expect(form).toHaveAttribute("aria-hidden", "false");
    expect(input).toHaveAttribute("tabindex", "0");
    expect(accordionBtn).toHaveAttribute("tabindex", "0");
  });
});
