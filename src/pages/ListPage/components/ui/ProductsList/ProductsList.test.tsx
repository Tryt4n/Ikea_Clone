import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import { ProductsList } from "./ProductsList";
import useList from "../../../hooks/useList";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";

vi.mock("../../../hooks/useList");

describe("ListProductProductsList", () => {
  const managedProducts: ShoppingCartType[] = shoppingCart;

  beforeEach(() => {
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      managedProducts: managedProducts,
    });
  });

  it("should render a component", () => {
    // Act
    render(<ProductsList />);

    const list = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    // Assert
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute("tabindex", "0");
    expect(list.children).toHaveLength(shoppingCart.length);

    listItems.forEach((listItem) => {
      const img = listItem.querySelector("img");

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src");
      expect(img).toHaveAttribute("alt");
    });
  });
});
