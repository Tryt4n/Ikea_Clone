import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import useModal from "../../../../hooks/useModal/useModal";
import ImagePreview from "./ImagePreview";
import { exampleFetchedProductData } from "../../../../setup-test/test-constants/exampleFetchedProductData";
import type { ModalDataImagePreviewType } from "../../types/ModalTypes";
import { productLink } from "../../../../constants/links";

vi.mock("../../../../hooks/useModal/useModal");

describe("Modal ImagePreview variant", () => {
  const path = {
    collection: exampleFetchedProductData.collection,
    product: exampleFetchedProductData.name,
    type: exampleFetchedProductData.variant,
    productID: exampleFetchedProductData.productNumber,
  };

  const data: ModalDataImagePreviewType = {
    type: "image-preview",
    productData: {
      images: exampleFetchedProductData.images,
      name: exampleFetchedProductData.name,
      variant: exampleFetchedProductData.variant,
    },
    index: 0,
    path: path,
    displayedMainImg: {
      src: exampleFetchedProductData.images.main,
      variant: exampleFetchedProductData.variant,
    },
  };

  const closeModal = vi.fn();

  beforeEach(() => {
    (useModal as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      closeModal: closeModal,
    });
  });

  it("should render a component with images", () => {
    // Act
    render(<ImagePreview data={data} />);

    const images = screen.getAllByRole("img");

    // Assert
    expect(
      screen.getByRole("heading", { name: /podgląd obrazu/i }),
    ).toBeInTheDocument();

    images.forEach((image, index) => {
      if (index === 0) {
        expect(image).toHaveAttribute(
          "src",
          `${data.displayedMainImg!.src}?f=l`,
        );
      } else {
        Object.keys(data.productData.images).forEach((key, index2) => {
          const url = `${productLink}/${path.collection}-${data.productData.name}-${data.productData.variant}__${data.productData.images[key]}?f=l`;

          if (index === index2) {
            expect(image).toHaveAttribute("src", url);
          }
        });
      }
    });
  });

  it("should render a component with video", () => {
    // Arrange
    const image = {
      ...exampleFetchedProductData.images,
      video: "video.mp4",
    };

    const data: ModalDataImagePreviewType = {
      type: "image-preview",
      productData: {
        images: image,
        name: exampleFetchedProductData.name,
        variant: exampleFetchedProductData.variant,
      },
      index: 0,
      path: path,
      displayedMainImg: {
        src: exampleFetchedProductData.images.main,
        variant: exampleFetchedProductData.variant,
      },
    };

    // Act
    render(<ImagePreview data={data} />);

    const video = screen.getByTestId("image-preview-video");

    // Assert
    expect(video).toBeInTheDocument();
  });

  it("should call closeModal function when the close button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(<ImagePreview data={data} />);

    const button = screen.getByRole("button", { name: /zamknij/i });

    await user.click(button);

    // Assert
    expect(closeModal).toHaveBeenCalledOnce();
  });
});
