import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import CollectionProducts from "./CollectionProducts";
import { exampleProducts } from "../../../../setup-test/test-constants/exampleProducts";
import Collection from "../../../../compoundComponents/CollectionProducts/layout/Collection";
import type { ReactNode } from "react";
import type { ProductType } from "../CollectionProductsList/CollectionProductsList";

describe("CollectionProducts", () => {
  const collectionWrapper = (children: ReactNode) => (
    <Collection children={children} />
  );

  it("should render a list of products", () => {
    // Arrange
    const products = exampleProducts;

    // Act
    render(collectionWrapper(<CollectionProducts products={products} />));
    const collectionList = screen.getByRole("list");

    // Assert
    expect(collectionList).toBeInTheDocument();
    expect(collectionList.children.length).toBe(products.length);
  });

  it("should render an empty list if the window size is less than 600px and the product is marked to be hidden on mobile", () => {
    // Arrange
    const products: ProductType[] = exampleProducts.map((product) => {
      return {
        ...product,
        hideOnMobile: true,
      };
    });
    window.innerWidth = 599;

    // Act
    render(
      collectionWrapper(
        <CollectionProducts products={products} hideTooltips={true} />,
      ),
    );
    const collectionList = screen.getByRole("list");

    // Assert
    expect(collectionList).toBeInTheDocument();
    expect(collectionList.children.length).toBe(0);
  });

  it("should render an list if the window size is at least 600px and the product is marked to be hidden on mobile", () => {
    // Arrange
    const products: ProductType[] = exampleProducts.map((product) => {
      return {
        ...product,
        hideOnMobile: true,
      };
    });
    window.innerWidth = 600;

    // Act
    render(
      collectionWrapper(
        <CollectionProducts products={products} hideTooltips={true} />,
      ),
    );

    const collectionList = screen.getByRole("list");

    // Assert
    expect(collectionList).toBeInTheDocument();
    expect(collectionList.children.length).toBe(products.length);
  });
});
