import { render, screen } from "../../../../../setup-test/test-utils";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { BtnDeleteProduct } from "./BtnDeleteProduct";
import useToast from "../../../../../hooks/useToast/useToast";
import useApp from "../../../../../hooks/useApp/useApp";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";
import { initState } from "../../../../../context/AppContext/constants/appInitState";

vi.mock("../../../../../hooks/useApp/useApp");
vi.mock("../../../../../hooks/useToast/useToast");

describe("ShoppingCart BtnDeleteProduct", () => {
  it("should remove product from shopping cart", async () => {
    const state = initState;
    const dispatch = vi.fn();
    const setToastData = vi.fn();

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: state,
      dispatch: dispatch,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });

    const user = userEvent.setup();

    // Arrange
    const product: ShoppingCartType = shoppingCart[0];

    // Act
    render(<BtnDeleteProduct product={product} />);

    const button = screen.getByRole("button", { name: /usuń produkt/i });

    await user.click(button);

    // Assert
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "removeProductFromShoppingCart",
      payload: product.productNumber,
    });

    // Get the prevState function from the last call to setToastData
    const prevState = setToastData.mock.calls[0][0].prevState;

    // Call the prevState function
    prevState();

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `Usunięto produkt ${product.collection} z koszyka.`,
      prevState: prevState,
    });
  });
});
