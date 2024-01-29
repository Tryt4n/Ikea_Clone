import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import ProductImageGallery from "./ProductImageGallery";
import useModal from "../../../../hooks/useModal/useModal";
import useProduct from "../../hooks/useProduct";
import type { ProductDataType } from "../../types/ProductDataType";

vi.mock("../../../../hooks/useModal/useModal");
vi.mock("../../hooks/useProduct");

describe("ProductImageGallery", () => {
  const setModalData = vi.fn();
  const path = {
    collection: exampleFetchedProductData.collection,
    product: exampleFetchedProductData.name,
    type: exampleFetchedProductData.variant,
    productID: exampleFetchedProductData.productNumber,
  };
  const displayedMainImg = {
    src: "some-src",
    variant: "some-variant",
  };

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setModalData: setModalData,
    });

    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      path: path,
      displayedMainImg: displayedMainImg,
    });
  });

  it("should render component for desktop", () => {
    // Arrange
    window.innerWidth = 900;

    const productImages = {
      ...exampleFetchedProductData.images,
      video: "some-video",
    };

    const product: ProductDataType = {
      ...exampleFetchedProductData,
      images: productImages,
    };

    // Act
    render(<ProductImageGallery data={product} />);

    const container = screen.getByTestId("product-image-gallery");
    const containerItems = screen.getAllByTestId("product-image-gallery-item");

    // Assert
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe("SECTION");

    containerItems.forEach((item, index) => {
      if (index !== containerItems.length - 1) {
        expect(item.tagName).toBe("BUTTON");
      } else {
        expect(item.tagName).toBe("DIV");
      }
    });

    expect(screen.getByTestId("product-video")).toBeInTheDocument();
  });

  it("should render component for mobile", () => {
    // Arrange
    window.innerWidth = 899;

    // Act
    render(<ProductImageGallery data={exampleFetchedProductData} />);

    const container = screen.getByTestId("product-image-gallery");

    // Assert
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe("DIV");
  });

  it("should open modal with image preview", async () => {
    // Arrange
    window.innerWidth = 900;

    const productImages = {
      ...exampleFetchedProductData.images,
    };

    const product: ProductDataType = {
      ...exampleFetchedProductData,
      images: productImages,
    };

    const index = 2;

    const user = userEvent.setup();

    // Act
    render(<ProductImageGallery data={product} />);

    const imagePreviewBtn = screen.getAllByTestId("product-image-gallery-item")[
      index
    ];

    await user.click(imagePreviewBtn);

    // Assert
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "image-preview",
      productData: product,
      index: index,
      path: path,
      displayedMainImg: displayedMainImg,
    });
  });

  it("should open modal with video preview", async () => {
    // Arrange
    window.innerWidth = 900;

    const productImages = {
      ...exampleFetchedProductData.images,
      video: "some-video",
    };

    const product: ProductDataType = {
      ...exampleFetchedProductData,
      images: productImages,
    };

    const user = userEvent.setup();

    // Act
    render(<ProductImageGallery data={product} />);

    const videoPreviewBtn = screen.getByTestId("product-video");
    const playVideoBtn = screen.getByRole("button", {
      name: "Naciśnij aby powiększyć wideo",
    });

    await user.click(playVideoBtn);

    // Assert
    expect(videoPreviewBtn).toBeInTheDocument();
    expect(setModalData).toHaveBeenCalledOnce();
    expect(setModalData).toHaveBeenCalledWith({
      type: "image-preview",
      productData: product,
      index: expect.any(Number),
      path: path,
      displayedMainImg: displayedMainImg,
    });
  });

  it("should have top seller badge", () => {
    // Arrange
    const product: ProductDataType = {
      ...exampleFetchedProductData,
      topSeller: true,
    };

    // Act
    render(<ProductImageGallery data={product} />);

    // Assert
    expect(screen.getByText(/top seller/i)).toBeInTheDocument();
  });

  it("should have top seller badge", () => {
    // Arrange
    const product: ProductDataType = {
      ...exampleFetchedProductData,
      topSeller: true,
      limitedEdition: true,
    };

    // Act
    render(<ProductImageGallery data={product} />);

    // Assert
    expect(screen.getByText(/kolekcja limitowana/i)).toBeInTheDocument();
  });

  it("should render button for showing more images", () => {
    // Arrange
    window.innerWidth = 900;

    const productImages = {
      image_1: "image_1.jpg",
      image_2: "image_2.jpg",
      image_3: "image_3.jpg",
      image_4: "image_4.jpg",
      image_5: "image_5.jpg",
      image_6: "image_6.jpg",
      image_7: "image_7.jpg",
      image_8: "image_8.jpg",
      image_9: "image_9.jpg",
      image_10: "image_10.jpg",
    };

    const product: ProductDataType = {
      ...exampleFetchedProductData,
      images: productImages,
    };

    // Act
    render(<ProductImageGallery data={product} />);

    const showMoreBtn = screen.getByRole("button", {
      name: "Pokaż więcej zdjęć",
    });

    // Assert
    expect(showMoreBtn).toBeInTheDocument();
  });
});
