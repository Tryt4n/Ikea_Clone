import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChooseColor from "./ChooseColor";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import type { ModalDataChooseColorType } from "../../types/ModalTypes";

describe("Modal ChooseColor variant", () => {
  it("should render a list of color variants", () => {
    // Arrange
    const data: ModalDataChooseColorType = {
      type: "choose-color",
      productData: exampleFetchedProductData,
      path: {
        collection: exampleFetchedProductData.collection,
        product: exampleFetchedProductData.name,
        type: exampleFetchedProductData.variant,
        productID: exampleFetchedProductData.productNumber,
      },
    };

    // Act
    render(<ChooseColor data={data} />);

    const chosenColor = screen.getByLabelText("Obecnie wybrany kolor");
    const otherColors = screen.getAllByRole("link");

    // Assert
    expect(chosenColor).toBeInTheDocument();
    expect(chosenColor.tagName).toBe("DIV");
    expect(chosenColor).toHaveTextContent(
      exampleFetchedProductData.variantName,
    );
    expect(chosenColor).not.toHaveAttribute("href");

    expect(otherColors).toHaveLength(
      exampleFetchedProductData.variants.length - 1,
    );
    otherColors.forEach((color, index) => {
      expect(color).toHaveTextContent(
        exampleFetchedProductData.variantsName[index + 1],
      );
      expect(color).toHaveAttribute("href");
    });
  });
});
