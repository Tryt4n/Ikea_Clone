import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../../setup-test/test-utils";
import { ShoppingCart } from "./ShoppingCart";
import { shoppingCart } from "../../../../../../setup-test/test-constants/shoppingCart";

describe("ShoppingCart", () => {
  it("should render the ShoppingCart component without badge if shopping cart is empty", () => {
    // Arrange
    localStorage.setItem("shoppingCart", JSON.stringify([]));

    // Act
    render(<ShoppingCart />);

    // Assert
    expect(screen.getByText(/koszyk/i)).toBeInTheDocument();
  });

  it("should render the ShoppingCart component without badge if `shoppingCart` localStorage does not exist", () => {
    // Act
    render(<ShoppingCart />);

    // Assert
    expect(screen.getByText(/koszyk/i)).toBeInTheDocument();
  });

  it("should render the ShoppingCart component without badge if shopping cart has not valid values", () => {
    // Arrange
    localStorage.setItem("shoppingCart", JSON.stringify([{}, {}]));

    // Act
    render(<ShoppingCart />);

    // Assert
    expect(screen.getByText(/koszyk/i)).toBeInTheDocument();
  });

  it("should render the ShoppingCart component with badge if shopping cart has valid values", () => {
    // Arrange
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    const totalQuantity = shoppingCart.reduce(
      (total, product) => (total += product.quantity),
      0,
    );

    // Act
    render(<ShoppingCart />);

    const badge = screen.getByTestId("shopping-cart-badge");

    // Assert
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent(totalQuantity.toString());
  });
});
