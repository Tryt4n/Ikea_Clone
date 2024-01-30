import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../setup-test/test-utils";
import ShoppingCart from "./ShoppingCart";
import useApp from "../../hooks/useApp/useApp";
import { initState } from "../../context/AppContext/constants/appInitState";
import { shoppingCart } from "../../setup-test/test-constants/shoppingCart";

vi.mock("../../hooks/useApp/useApp");

describe("ShoppingCart page", () => {
  it("should render the empty shopping cart if shopping cart does not exist or does not have any products", () => {
    // Arrange
    const state = {
      ...initState,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<ShoppingCart />);

    // Assert
    expect(screen.getByText(/twój koszyk jest pusty/i)).toBeInTheDocument();
  });

  it("should render the empty shopping cart if shopping cart does not have any products", () => {
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
    expect(screen.getByText(/twój koszyk jest pusty/i)).toBeInTheDocument();
  });

  it("should render the empty shopping cart if shopping cart does not have any products", () => {
    // Arrange
    const state = {
      ...initState,
      shoppingCart: shoppingCart,
    };

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
    });

    // Act
    render(<ShoppingCart />);

    const cartHeading = screen.getByText(
      /Jak chciałbyś otrzymać swoje zamówienie/i,
    );
    const asideMenuHeading = screen.getByText(/podsumowanie/i);

    // Assert
    expect(cartHeading).toBeInTheDocument();
    expect(asideMenuHeading).toBeInTheDocument();
  });
});
