import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import BuyModule from "./BuyModule";
import type { ProductDataType } from "../../types/ProductDataType";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import useModal from "../../../../hooks/useModal/useModal";
import useProduct from "../../hooks/useProduct";

vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../hooks/useProduct");

describe("ProductPage BuyModule", () => {
  const setModalData = vi.fn();
  const displayedMainImg = {
    variant: "some-variant",
  };
  const path = {
    collection: exampleFetchedProductData.collection,
    product: exampleFetchedProductData.name,
    type: exampleFetchedProductData.variant,
    productID: exampleFetchedProductData.productNumber,
  };

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      displayedMainImg: displayedMainImg,
      path: path,
    });
  });

  it("should render component with all inner components", () => {
    // Arrange
    window.innerWidth = 900;

    const product: ProductDataType = {
      ...exampleFetchedProductData,
      softnessIndex: "średnio twardy",
      forKidsBadge: true,
      guarantee: 10,
      newTag: {
        variant: "green",
      },
      oldPriceTag: {
        variant: "green",
        integer: 999,
        decimal: 50,
      },
    };

    // Act
    render(<BuyModule data={product} />);

    const newTag = screen.getByText(/nowość/i);
    const oldPriceTag = screen.getByText(/nowa niższa cena/i);
    const rating = screen.getByLabelText(/otwórz menu ocen/i);
    const additionalInformation = screen.getByText(
      product.additionalInformation!,
    );
    const guarantee = screen.getByText(`${product.guarantee}-letnia gwarancja`);
    const softnessIndex = screen.getByText(product.softnessIndex!);
    const colorsBtn = screen.getByText(/wybierz kolor/i);
    const thumbnailsContainer = screen.getByLabelText(
      /linki do innych wariantów produktu/i,
    );
    const sizesBtn = screen.getByText(/wybierz rozmiar/i);
    const kidsBadge = screen.getByTestId("information-box-container");

    // Assert
    expect(newTag).toBeInTheDocument();
    expect(oldPriceTag).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(additionalInformation).toBeInTheDocument();
    expect(guarantee).toBeInTheDocument();
    expect(softnessIndex).toBeInTheDocument();
    expect(colorsBtn).toBeInTheDocument();
    expect(thumbnailsContainer).toBeInTheDocument();
    expect(sizesBtn).toBeInTheDocument();
    expect(kidsBadge).toBeInTheDocument();
  });

  it("should open sizes modal on button click", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<BuyModule data={exampleFetchedProductData} />);

    const sizesBtn = screen.getByText(/wybierz rozmiar/i);

    await user.click(sizesBtn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "choose-size",
      productData: exampleFetchedProductData,
      path: path,
    });
  });

  it("should open sizes modal on button click", async () => {
    // Arrange
    window.innerWidth = 900;

    const user = userEvent.setup();

    // Act
    render(<BuyModule data={exampleFetchedProductData} />);

    const colorsBtn = screen.getByText(/wybierz kolor/i);

    await user.click(colorsBtn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "choose-color",
      productData: exampleFetchedProductData,
      path: path,
    });
  });
});
