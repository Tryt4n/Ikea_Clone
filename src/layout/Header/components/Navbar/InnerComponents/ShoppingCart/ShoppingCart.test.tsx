import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../../setup-test/test-utils";
import { ShoppingCart } from "./ShoppingCart";
import { shoppingCart } from "../../../../../../setup-test/test-constants/shoppingCart";
import useApp from "../../../../../../hooks/useApp/useApp";
import { initState } from "../../../../../../context/AppContext/constants/appInitState";

vi.mock("../../../../../../hooks/useApp/useApp");

describe("ShoppingCart", () => {
  const state = initState;

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });
  });

  it("should render the ShoppingCart component without badge if shopping cart does not exist", () => {
    // Act
    render(<ShoppingCart />);

    // Assert
    expect(screen.getByText(/koszyk/i)).toBeInTheDocument();
  });

  it("should render the ShoppingCart component without badge if shopping cart is empty", () => {
    // Arrange
    const state = {
      ...initState,
      shoppingCart: [],
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<ShoppingCart />);

    // Assert
    expect(screen.getByText(/koszyk/i)).toBeInTheDocument();
  });

  it("should render the ShoppingCart component without badge if shopping cart has not valid values", () => {
    // Arrange
    const state = {
      ...initState,
      shoppingCart: [{}, {}],
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<ShoppingCart />);

    // Assert
    expect(screen.getByText(/koszyk/i)).toBeInTheDocument();
  });

  it("should render the ShoppingCart component with badge if shopping cart has valid values", () => {
    // Arrange
    const state = {
      ...initState,
      shoppingCart: shoppingCart,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

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
