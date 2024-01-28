import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import ProductPageLayout from "./ProductPageLayout";
import useProduct from "../../context/useProduct";
import useFetch from "../../../../hooks/useFetch/useFetch";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";

vi.mock("../../context/useProduct");
vi.mock("../../../../hooks/useFetch/useFetch");

describe("ProductPageLayout", () => {
  const setDisplayedMainImg = vi.fn();
  const data = exampleFetchedProductData;

  beforeEach(() => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      path: {
        collection: data.collection,
        product: data.name,
        type: data.variant,
        productID: data.productNumber,
      },
      URL: "https://product.com",
      displayedMainImg: {
        src: "",
        variant: "",
      },
      setDisplayedMainImg: setDisplayedMainImg,
    });

    (useFetch as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: data,
      isLoading: false,
      isError: false,
    });
  });

  it("should render a component with loading state", () => {
    // Arrange
    (useFetch as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    // Act
    render(<ProductPageLayout />);

    expect(
      screen.getByRole("heading", { name: /ładowanie/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it("should render a component with error state", () => {
    // Arrange
    (useFetch as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    // Act
    render(<ProductPageLayout />);

    expect(
      screen.getByRole("heading", {
        name: /nie można załadować strony/i,
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  it("should properly render a component", () => {
    // Act
    render(<ProductPageLayout />);

    const article = screen.getByRole("article");

    // Assert
    expect(article).toBeInTheDocument();
  });
});
