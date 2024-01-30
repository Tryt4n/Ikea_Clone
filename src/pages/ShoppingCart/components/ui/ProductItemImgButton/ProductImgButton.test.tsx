import { render, screen } from "../../../../../setup-test/test-utils";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ProductImgButton } from "./ProductImgButton";
import useModal from "../../../../../hooks/useModal/useModal";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";
import { useParams } from "react-router-dom";

vi.mock("../../../../../hooks/useModal/useModal");
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useParams: vi.fn(),
}));

describe("ShoppingCart BtnDeleteProduct", () => {
  it("should open product control modal", async () => {
    // Arrange
    const setModalData = vi.fn();
    const params = { path: "some-path" };

    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(params);

    const product = shoppingCart[0];

    const user = userEvent.setup();

    // Act
    render(<ProductImgButton product={product} src={"some-src"} />);

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "image-preview",
      productData: {
        images: product.images,
        variant: product.variant,
        name: product.name,
      },
      index: 0,
      path: params,
    });
  });
});
