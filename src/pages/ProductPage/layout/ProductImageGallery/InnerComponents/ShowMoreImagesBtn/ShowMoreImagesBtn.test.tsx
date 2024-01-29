import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../../../setup-test/test-utils";
import userEvent from "@testing-library/user-event";
import { ShowMoreImagesBtn } from "./ShowMoreImagesBtn";
import { exampleFetchedProductData } from "../../../../../../setup-test/test-constants/exampleFetchedProductData";

describe("ProductPage ShowMoreImagesBtn", () => {
  it("should render component", () => {
    // Arrange
    const images = exampleFetchedProductData.images;
    const setVisibleImages = vi.fn();

    // Act
    render(
      <ShowMoreImagesBtn
        images={images}
        visibleImages={2}
        setVisibleImages={setVisibleImages}
      />,
    );

    const button = screen.getByRole("button");

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/pokaż więcej zdjęć/i);
  });

  it("should display 'Pokaż mniej' when all images are visible", () => {
    // Arrange
    const images = exampleFetchedProductData.images;
    const setVisibleImages = vi.fn();

    // Act
    render(
      <ShowMoreImagesBtn
        images={images}
        visibleImages={Object.keys(images).length}
        setVisibleImages={setVisibleImages}
      />,
    );

    const button = screen.getByRole("button");

    // Assert
    expect(button).toHaveTextContent(/pokaż mniej/i);
  });

  it("should call setVisibleImages with correct arguments", async () => {
    // Arrange
    const images = exampleFetchedProductData.images;
    const setVisibleImages = vi.fn();

    const user = userEvent.setup();

    // Act
    render(
      <ShowMoreImagesBtn
        images={images}
        visibleImages={8}
        setVisibleImages={setVisibleImages}
      />,
    );

    const button = screen.getByRole("button");

    await user.click(button);

    // Assert
    expect(setVisibleImages).toHaveBeenCalled();
    expect(button).toHaveTextContent(/pokaż więcej zdjęć/i);
  });
});
