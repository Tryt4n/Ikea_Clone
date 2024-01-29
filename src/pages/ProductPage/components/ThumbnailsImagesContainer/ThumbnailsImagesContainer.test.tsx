import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import ThumbnailsImagesContainer from "./ThumbnailsImagesContainer";
import useProduct from "../../hooks/useProduct";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import { productLink } from "../../../../constants/links";
import type { ProductDataType } from "../../types/ProductDataType";

vi.mock("../../hooks/useProduct");

describe("ProductPage ThumbnailsImagesContainer", () => {
  const path = {
    collection: exampleFetchedProductData.collection,
    product: exampleFetchedProductData.name,
    type: exampleFetchedProductData.variant,
    productID: exampleFetchedProductData.productNumber,
  };
  const setDisplayedMainImg = vi.fn();

  beforeEach(() => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      path: path,
      setDisplayedMainImg: setDisplayedMainImg,
    });
  });

  it("should render a component", () => {
    // Arrange
    const openModal = vi.fn();

    // Act
    render(
      <ThumbnailsImagesContainer
        data={exampleFetchedProductData}
        openModal={openModal}
      />,
    );

    const currentProduct = screen.getByLabelText(/aktualnie wybrany wariant/i);
    const otherProducts = screen.getAllByRole("link");

    // Assert
    expect(currentProduct).toBeInTheDocument();
    expect(currentProduct.tagName).toBe("DIV");
    expect(currentProduct).not.toHaveAttribute("href");

    expect(otherProducts).toHaveLength(
      exampleFetchedProductData.variants.length - 1,
    );
    otherProducts.forEach((product) => expect(product).toHaveAttribute("href"));
  });

  it("should change image on hover", async () => {
    // Arrange
    const openModal = vi.fn();

    const user = userEvent.setup();

    // Act
    render(
      <ThumbnailsImagesContainer
        data={exampleFetchedProductData}
        openModal={openModal}
      />,
    );

    const otherProducts = screen.getAllByRole("link");
    const secondProduct = otherProducts[0];

    // Act - hover image
    await user.hover(secondProduct);

    // Assert - main image should change for hovered one
    expect(setDisplayedMainImg).toHaveBeenCalledOnce();
    expect(setDisplayedMainImg).toHaveBeenCalledWith({
      src: expect.any(String),
      variant: exampleFetchedProductData.variantsName[1],
    });

    // Act - unhover image
    await user.unhover(secondProduct);

    // Assert - main image should change back to main one
    expect(setDisplayedMainImg).toHaveBeenCalledTimes(2);
    expect(setDisplayedMainImg).toHaveBeenCalledWith({
      src: `${productLink}/${path.collection}-${exampleFetchedProductData.name}-${exampleFetchedProductData.variant}__${exampleFetchedProductData.images.main}`,
      variant: path.type ? path.type : exampleFetchedProductData.variant,
    });
  });

  it("should render button to open modal with all variants if their length is bigger than 7", async () => {
    // Arrange
    const productVariants = [
      "variant-1",
      "variant-2",
      "variant-3",
      "variant-4",
      "variant-5",
      "variant-6",
      "variant-7",
      "variant-8",
    ];

    const product: ProductDataType = {
      ...exampleFetchedProductData,
      variants: productVariants,
    };

    const openModal = vi.fn();

    const user = userEvent.setup();

    // Act
    render(<ThumbnailsImagesContainer data={product} openModal={openModal} />);

    const button = screen.getByRole("button");

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(`+${product.variants.length - 7}`, {
      normalizeWhitespace: true,
    });

    // Act - open modal
    await user.click(button);

    // Assert - openModal function should be called
    expect(openModal).toHaveBeenCalledOnce();
    expect(openModal).toHaveBeenCalledWith(product);
  });
});
