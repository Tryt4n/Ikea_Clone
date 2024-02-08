// Import react router dependencies
import { useParams } from "react-router-dom";
// Import custom hooks
import useModal from "../../../../../hooks/useModal/useModal";
// Import types
import type { ModalDataImagePreviewType } from "../../../../../layout/Modal/types/ModalTypes";

// Define the ProductImgButtonPropsType props type.
type ProductImgButtonPropsType = {
  product: ModalDataImagePreviewType["productData"]; // The product passed to the ProductImgButton component.
  src: string; // The source URL of the product image.
};

/**
 * ProductImgButton is a functional component that takes in a product and a source URL as props.
 * It uses the useModal custom hook to get the setModalData function, and the useParams hook to get the current route parameters.
 * It renders a button that, when clicked, opens an image preview modal with the product's images.
 *
 * @param {object} product The product passed to the ProductImgButton component.
 * @param {string} props.src The source URL of the product image.
 * @returns {JSX.Element} A button that opens an image preview modal when clicked.
 */

export function ProductImgButton({ product, src }: ProductImgButtonPropsType) {
  const { setModalData } = useModal(); // Get the setModalData function using the useModal custom hook.
  const params = useParams(); // Get the current route parameters using the useParams hook from react-router-dom.

  // Define a function to open the image preview modal.
  function openImagesPreview() {
    // Set the modal data to display the product's images.
    setModalData({
      type: "image-preview",
      productData: {
        images: product.images,
        variant: product.variant,
        name: product.name,
      },
      index: 0,
      path: params,
    });
  }

  return (
    <button
      type="button"
      onClick={openImagesPreview}
      data-testid="shopping-cart-product-img-button"
    >
      <span className="visually-hidden">
        Naciśnij aby zobaczyć galerię zdjęć produktu
      </span>
      <img src={src} alt="" loading="lazy" />
    </button>
  );
}
