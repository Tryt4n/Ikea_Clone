// Import components
import { Btn } from "../../../../../../components/ui/Btn/Btn";
// Import types
import type { Dispatch } from "react";
import type { ProductDataType } from "../../../../types/ProductDataType";

// Define props type for the ShowMoreImagesBtn component
type ShowMoreImagesBtnPropsType = {
  images: ProductDataType["images"]; // An object that contains the images for the product
  visibleImages: number; // The current number of visible images
  setVisibleImages: Dispatch<React.SetStateAction<number>>; // A function to update the `visibleImages` state
};

/**
 * ShowMoreImagesBtn Component
 *
 * This is a React functional component. It displays a button that allows the user to show more or less images in a product image gallery. The number of visible images is controlled by the `visibleImages` state, which is updated by the `setVisibleImages` function. When the button is clicked, the `handleShowMoreClick` function is called, which updates the `visibleImages` state to show more images or reset it to the initial number of visible images.
 *
 * @param {Object} props.images - An object that contains the images for the product.
 * @param {number} props.visibleImages - The current number of visible images.
 * @param {Function} props.setVisibleImages - A function to update the `visibleImages` state.
 *
 * @example
 * <ShowMoreImagesBtn images={productImages} visibleImages={8} setVisibleImages={setVisibleImages} />
 *
 * @returns A JSX element that consists of a `div` with the class name `product-image-gallery__btn-wrapper`. Inside this `div`, it renders a `Btn` component with the `variant`, `className`, and `onClick` props. The `onClick` prop is set to the `handleShowMoreClick` function. The children of the `Btn` component is a string that depends on whether all images are currently visible or not.
 */

export function ShowMoreImagesBtn({
  images,
  visibleImages,
  setVisibleImages,
}: ShowMoreImagesBtnPropsType) {
  // Show more or less images when the button is clicked
  function handleShowMoreClick() {
    // If all images are currently visible, reset the number of visible images to the initial number of visible images. Otherwise, show more images.
    if (visibleImages === Object.keys(images).length) {
      setVisibleImages(8);
    } else {
      setVisibleImages((prevVisibleImages) =>
        Math.min(prevVisibleImages + 8, Object.keys(images).length),
      );
    }
  }

  return (
    <div className="product-image-gallery__btn-wrapper">
      <Btn
        variant="light-with-border"
        className="product-image-gallery__show-more-btn"
        onClick={handleShowMoreClick}
      >
        {visibleImages === Object.keys(images).length
          ? "Pokaż mniej"
          : "Pokaż więcej zdjęć"}
      </Btn>
    </div>
  );
}
