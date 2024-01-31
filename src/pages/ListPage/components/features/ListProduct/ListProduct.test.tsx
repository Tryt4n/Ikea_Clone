import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ListProduct from "./ListProduct";
import useList from "../../../hooks/useList";
import { shoppingCart } from "../../../../../setup-test/test-constants/shoppingCart";
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";
import { exampleList } from "../../../../../setup-test/test-constants/exampleList";

vi.mock("../../../hooks/useList");

describe("ListProduct", () => {
  beforeEach(() => {
    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      managedProducts: [],
    });
  });

  it("should render a component", () => {
    // Arrange
    const product: ShoppingCartType = {
      ...shoppingCart[0],
      newTag: {
        variant: "blue",
      },
      price: {
        integer: 9,
        decimal: 99,
        quantity: 2,
        sizeInMeters: 1.47,
      },
      oldPrice: {
        variant: "gray",
        integer: 10,
        decimal: 99,
      },
    };

    // Act
    render(<ListProduct product={product} />);

    const heading = screen.getByRole("heading", {
      level: 3,
      hidden: true,
      name: product.collection,
    });
    const productLink = screen.getByRole("link");
    const productImage = screen.getByRole("img");
    const checkbox = screen.getByRole("checkbox");
    const checkboxContainer = checkbox.parentElement;
    const rating = screen.getByText(/ocena:/i);
    const quantity = screen.getByTestId("quantity-input");
    const buttonAddToShoppingCart = screen.getByRole("button", {
      name: /dodaj do koszyka/i,
    });
    const moreOptionList = screen.getByRole("list");

    // Assert
    expect(heading).toBeInTheDocument();

    expect(productLink).toBeInTheDocument();

    expect(productImage).toBeInTheDocument();

    expect(checkboxContainer).toHaveClass(
      "list-product__checkbox-wrapper--hidden",
    );

    expect(checkbox).toBeInTheDocument();

    expect(rating).toBeInTheDocument();

    expect(quantity).toBeInTheDocument();

    expect(buttonAddToShoppingCart).toBeInTheDocument();

    expect(moreOptionList).toBeInTheDocument();

    if (product.newTag) {
      expect(screen.getByText(/nowość/i)).toBeInTheDocument();
    }

    if (product.oldPrice) {
      expect(screen.getByText(/nowa niższa cena/i)).toBeInTheDocument();
      expect(screen.getByText(/10,99/i)).toBeInTheDocument();
    }

    if (product.price.quantity) {
      const quantityRegex = new RegExp(
        `.*${product.price.quantity} szt./opak..*`,
        "i",
      );
      expect(screen.getByText(quantityRegex)).toBeInTheDocument();
    }
  });

  it("should render checkbox with uncheck status if it's on the `managedProducts` list", () => {
    // Act
    render(<ListProduct product={shoppingCart[0]} />);

    const checkbox = screen.getByRole("checkbox");

    // Assert
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should render checkbox with check status if it's on the `managedProducts` list", () => {
    // Arrange
    const product = shoppingCart[0];

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      managedProducts: [product],
      setManagedProducts: vi.fn(),
    });

    // Act
    render(<ListProduct product={product} />);

    const checkbox = screen.getByRole("checkbox");
    const checkboxContainer = checkbox.parentElement;

    // Assert
    expect(checkboxContainer).not.toHaveClass(
      "list-product__checkbox-wrapper--hidden",
    );

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("should remove product from managed list when checkbox is clicked", async () => {
    // Arrange
    const product = exampleList.products![0];
    let managedProducts: ShoppingCartType[] = exampleList.products!;

    const updatedProducts = managedProducts.filter(
      (item) => item.productNumber !== product.productNumber,
    );

    const setManagedProducts = vi.fn((callback) => {
      managedProducts = callback(managedProducts);
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      managedProducts: managedProducts,
      setManagedProducts: setManagedProducts,
    });

    const user = userEvent.setup();

    // Act
    render(<ListProduct product={product} />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    // Assert
    expect(setManagedProducts).toHaveBeenCalledOnce();
    expect(managedProducts).toEqual(updatedProducts);
  });

  it("should add product to managed list when checkbox is clicked", async () => {
    // Arrange
    const product: ShoppingCartType = {
      collection: "some collection",
      productNumber: "9999999",
      size: "universal",
      price: {
        integer: 99,
      },
      variantName: "some variant name",
      variant: "some-variant-name",
      images: {
        main: "main.jpg",
        imgHover: "hover.jpg",
        image_1: "image_1.jpg",
      },
      nameToDisplay: "display name",
      name: "display-name",
      quantity: 1,
      productLink: "some-link.com",
      addedDate: new Date("2021-01-01T00:00:00.000Z"),
    };

    let managedProducts: ShoppingCartType[] = exampleList.products!;

    const setManagedProducts = vi.fn((callback) => {
      managedProducts = callback(managedProducts);
    });

    (useList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      managedProducts: managedProducts,
      setManagedProducts: setManagedProducts,
    });

    const user = userEvent.setup();

    // Act
    render(<ListProduct product={product} />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    const expectedProducts = [...exampleList.products!, product];

    // Assert
    expect(setManagedProducts).toHaveBeenCalledOnce();
    expect(managedProducts).toEqual(expectedProducts);
  });
});
