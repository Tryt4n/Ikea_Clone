import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import ProductInformations from "./ProductInformations";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import type { ProductDataType } from "../../types/ProductDataType";

describe("ProductInformations", () => {
  it("should render component with sustainable development and additional description components", () => {
    // Arrange
    const product: ProductDataType = {
      ...exampleFetchedProductData,
      sustainableDevelopment: true,
    };

    // Act
    render(<ProductInformations data={product} />);

    // Assert
    expect(
      screen.getByTestId("product-page-additional-info"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("product-page-sustainability"),
    ).toBeInTheDocument();
  });
});
