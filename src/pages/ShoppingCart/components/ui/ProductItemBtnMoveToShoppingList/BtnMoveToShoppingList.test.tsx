import { render, screen } from "../../../../../setup-test/test-utils";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { BtnMoveToShoppingList } from "./BtnMoveToShoppingList";
import useModal from "../../../../../hooks/useModal/useModal";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";

vi.mock("../../../../../hooks/useModal/useModal");

describe("ShoppingCart BtnMoveToShoppingList", () => {
  it("should open select list modal", async () => {
    // Arrange
    const setModalData = vi.fn();

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    const product = shoppingCart[0];

    const user = userEvent.setup();

    // Act
    render(<BtnMoveToShoppingList product={product} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "select-list",
      product: product,
    });
  });
});
