import { render, screen } from "../../../../../setup-test/test-utils";
import { describe, expect, it } from "vitest";
import ProductItem from "./ProductItem";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";

describe("ShoppingCart page ProductItem", () => {
  it("should render product item", () => {
    // Arrange
    const product: ShoppingCartType = shoppingCart[0];

    // Act
    render(<ProductItem product={product} />);

    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("should render product item with old price tag", () => {
    // Arrange
    const product: ShoppingCartType = {
      ...shoppingCart[0],
      oldPrice: {
        integer: 10,
        decimal: 0,
        variant: "blue",
      },
    };

    // Act
    render(<ProductItem product={product} />);

    expect(screen.getByText(/nowa niższa cena/i)).toHaveClass("tx-blue");
  });
});
