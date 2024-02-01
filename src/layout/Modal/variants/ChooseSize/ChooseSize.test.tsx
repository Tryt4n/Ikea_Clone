import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChooseSize from "./ChooseSize";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import type { ModalDataChooseSizeType } from "../../types/ModalTypes";

describe("Modal ChooseSize variant", () => {
  it("should render a list of size variants", () => {
    // Arrange
    const data: ModalDataChooseSizeType = {
      type: "choose-size",
      productData: exampleFetchedProductData,
      path: {
        collection: exampleFetchedProductData.collection,
        product: exampleFetchedProductData.name,
        type: exampleFetchedProductData.variant,
        productID: exampleFetchedProductData.productNumber,
      },
    };

    // Act
    render(<ChooseSize data={data} />);

    const chosenSize = screen.getByLabelText("Obecnie wybrany rozmiar");
    const otherSizes = screen.getAllByRole("link");

    // Assert
    expect(chosenSize).toBeInTheDocument();
    expect(chosenSize.tagName).toBe("DIV");
    expect(chosenSize).toHaveTextContent(exampleFetchedProductData.size);
    expect(chosenSize).not.toHaveAttribute("href");

    expect(otherSizes).toHaveLength(
      exampleFetchedProductData.variants.length - 1,
    );
    otherSizes.forEach((size, index) => {
      const sizesKeys = Object.keys(
        exampleFetchedProductData.relatedProducts!.sizes!,
      );
      const expectedSize = sizesKeys[index + 1];
      expect(size).toHaveTextContent(expectedSize);
      expect(size).toHaveAttribute("href");
    });
  });
});
