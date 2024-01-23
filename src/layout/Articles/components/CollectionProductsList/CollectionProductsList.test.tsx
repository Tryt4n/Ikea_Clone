import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import CollectionProductsList from "./CollectionProductsList";
import { exampleProducts } from "../../../../setup-test/test-constants/exampleProducts";

describe("CollectionProductsList", () => {
  it("should render a list of products with associated details", () => {
    // Arrange
    const products = exampleProducts;

    // Act
    render(<CollectionProductsList products={exampleProducts} />);
    const collectionList = screen.getByRole("list");

    // Assert
    expect(collectionList).toBeInTheDocument();
    expect(collectionList.children.length).toBe(products.length);
  });
});
