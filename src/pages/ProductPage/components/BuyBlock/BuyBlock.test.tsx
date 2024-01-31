import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import BuyBlock from "./BuyBlock";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import useProduct from "../../hooks/useProduct";
import useApp from "../../../../hooks/useApp/useApp";
import useToast from "../../../../hooks/useToast/useToast";

vi.mock("../../../../hooks/useApp/useApp");
vi.mock("../../../../hooks/useToast/useToast");
vi.mock("../../hooks/useProduct");

describe("ProductPage BuyBlock", () => {
  const dispatch = vi.fn();
  const setToastData = vi.fn();
  const path = {
    collection: exampleFetchedProductData.collection,
    product: exampleFetchedProductData.name,
    type: exampleFetchedProductData.variant,
    productID: exampleFetchedProductData.productNumber,
  };

  beforeEach(() => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      dispatch: dispatch,
    });

    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setToastData: setToastData,
    });

    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      path: path,
    });
  });

  it("should render a component", () => {
    // Act
    render(<BuyBlock product={exampleFetchedProductData} />);

    const quantityContainer = screen.getByTestId("quantity-input");
    const addToCartBtn = screen.getByRole("button", {
      name: /dodaj do koszyka/i,
    });

    // Assert
    expect(quantityContainer).toBeInTheDocument();
    expect(addToCartBtn).toBeInTheDocument();
  });

  it("should change quantity on buttons plus and minus click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<BuyBlock product={exampleFetchedProductData} />);

    const plusBtn = screen.getByRole("button", {
      name: /Naciśnij aby zwiększyć ilość/i,
    });
    const minusBtn = screen.getByRole("button", {
      name: /Naciśnij aby zmniejszyć ilość/i,
    });

    // Assert
    expect(plusBtn).toBeInTheDocument;

    // Act - change quantity by +1
    await user.click(plusBtn);

    // Assert - quantity should be 2
    expect(screen.getByText(/dodaj 2 szt. do koszyka/i)).toBeInTheDocument();

    // Act - change quantity by -1
    await user.click(minusBtn);

    // Assert - quantity should be 1
    expect(screen.getByText(/dodaj do koszyka/i)).toBeInTheDocument();
  });

  it("should change quantity on input change", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<BuyBlock product={exampleFetchedProductData} />);

    const quantityInput = screen.getByRole("textbox");

    // Assert
    expect(quantityInput).toBeInTheDocument;

    // Act - change quantity by +1
    await user.type(quantityInput, "10");

    // Assert - quantity should be 2
    expect(screen.getByText(/dodaj 10 szt. do koszyka/i)).toBeInTheDocument();
  });

  it("should add product to shopping cart on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    const quantity = 10;

    const currentDate = new Date();
    currentDate.setMilliseconds(0);

    // Act
    render(<BuyBlock product={exampleFetchedProductData} />);

    const addToCartBtn = screen.getByRole("button", {
      name: /dodaj do koszyka/i,
    });
    const input = screen.getByRole("textbox");

    // Act - change quantity to 10
    await user.type(input, `${quantity}`);

    // Assert - quantity should be 10
    expect(addToCartBtn).toHaveTextContent(/dodaj 10 szt. do koszyka/i);

    // Act - add product to shopping cart
    await user.click(addToCartBtn);

    // Assert
    expect(addToCartBtn).toHaveTextContent(/dodaj do koszyka/i);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "addToShoppingCart",
      payload: [
        {
          quantity: quantity,
          productNumber: exampleFetchedProductData.productNumber,
          collection: exampleFetchedProductData.collection,
          name: exampleFetchedProductData.name,
          nameToDisplay: exampleFetchedProductData.nameToDisplay,
          variant: exampleFetchedProductData.variant,
          variantName: exampleFetchedProductData.variantName,
          size: exampleFetchedProductData.size,
          price: exampleFetchedProductData.price,
          oldPrice: exampleFetchedProductData.oldPriceTag,
          images: exampleFetchedProductData.images,
          productLink: `/products/${path.collection}/${path.product}/${path.type}/${path.productID}`,
          newTag: exampleFetchedProductData.newTag,
          addedDate: currentDate,
          rating: exampleFetchedProductData.rating,
        },
      ],
    });

    expect(setToastData).toHaveBeenCalledOnce();
    expect(setToastData).toHaveBeenCalledWith({
      open: true,
      text: `${exampleFetchedProductData.collection} dodano do koszyka.`,
      link: "/shoppingcart",
    });
  });
});
