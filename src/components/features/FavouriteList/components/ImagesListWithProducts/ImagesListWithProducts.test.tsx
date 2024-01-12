import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../../../../../setup-test/test-utils";
import { ImagesListWithProducts } from "./ImagesListWithProducts";
import { exampleList } from "../../../../../constants/test-constants/exampleList";
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";

describe("ImagesListWithProducts", () => {
  it(`should render a ul element when there is only one product`, () => {
    // Arrange
    const products = [exampleList.products![0]];

    // Act
    render(<ImagesListWithProducts products={products} />);

    const listElement = screen.getByRole("list");
    const imgElement = screen.getByRole("img");

    // Assert
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass("favourite-list__inner-list-grid_1");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src");
    expect(imgElement).toHaveAttribute("alt");
  });

  it("should render a ul element when there are two products", () => {
    // Arrange
    const products = [exampleList.products![0], exampleList.products![1]];

    // Act
    render(<ImagesListWithProducts products={products} />);

    const listElement = screen.getByRole("list");
    const imgElements = screen.getAllByRole("img");

    // Assert
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass("favourite-list__inner-list-grid_2");

    expect(imgElements.length).toBe(2);
    imgElements.forEach((img) => {
      expect(img).toHaveAttribute("src");
      expect(img).toHaveAttribute("alt");
    });
  });

  it("should render a ul element when there are three products", () => {
    // Arrange
    const products = [
      exampleList.products![0],
      exampleList.products![1],
      exampleList.products![2],
    ];

    // Act
    render(<ImagesListWithProducts products={products} />);

    const listElement = screen.getByRole("list");
    const imgElements = screen.getAllByRole("img");

    // Assert
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass("favourite-list__inner-list-grid_3");

    expect(imgElements.length).toBe(3);
    imgElements.forEach((img) => {
      expect(img).toHaveAttribute("src");
      expect(img).toHaveAttribute("alt");
    });
  });

  it("should render a ul element when there are more than 3 products", () => {
    // Arrange
    const visibleImages = 2;

    // Act
    render(<ImagesListWithProducts products={exampleList.products!} />);

    const listElement = screen.getByRole("list");
    const imgElements = screen.getAllByRole("img");
    const spanElement = screen.getByText(
      `+${exampleList.products!.length - visibleImages}`
    );

    // Assert
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass("favourite-list__inner-list-grid_3");

    expect(imgElements.length).toBe(visibleImages);
    imgElements.forEach((img) => {
      expect(img).toHaveAttribute("src");
      expect(img).toHaveAttribute("alt");
    });

    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent(`+${visibleImages}`);
  });

  it("should render an empty ul element when the products array is empty", () => {
    // Arrange
    const products: ShoppingCartType[] = [];

    // Act
    render(<ImagesListWithProducts products={products} />);

    const listElement = screen.queryByRole("list");

    // Assert
    expect(listElement).toBeInTheDocument();
    expect(listElement?.children.length).toBe(0);
  });
});
