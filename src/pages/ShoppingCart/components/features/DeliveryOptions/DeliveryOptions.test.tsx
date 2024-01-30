import { render, screen } from "../../../../../setup-test/test-utils";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import DeliveryOptions from "./DeliveryOptions";

describe("ShoppingCart page DeliveryOptions", () => {
  it("should check selected input", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<DeliveryOptions />);

    const homeDeliveryInput = screen.getByRole("radio", {
      name: /dostawa do domu/i,
      hidden: true,
    });
    const otherOptionsInput = screen.getByRole("radio", {
      name: /opcje odbioru:/i,
      hidden: true,
    });

    // Assert
    expect(homeDeliveryInput).not.toBeChecked();
    expect(otherOptionsInput).not.toBeChecked();

    // Act - select otherOptionsInput
    await user.click(otherOptionsInput);

    // Assert
    expect(homeDeliveryInput).not.toBeChecked();
    expect(otherOptionsInput).toBeChecked();

    // Act - select homeDeliveryInput
    await user.click(homeDeliveryInput);
    screen.debug();

    // Assert - homeDeliveryInput is checked
    expect(homeDeliveryInput).toBeChecked();
    expect(otherOptionsInput).not.toBeChecked();
  });
});
