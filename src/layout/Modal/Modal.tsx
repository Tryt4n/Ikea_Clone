// Import react dependencies
import { forwardRef, type ForwardedRef } from "react";
// Import Modal Context
import useModal from "../../hooks/useModal/useModal";
// Import Modals components
import SideModalLayout from "./layout/SideModalLayout/SideModalLayout";
import MenuLayout from "./layout/MenuLayout/MenuLayout";
import ImagePreview from "./variants/ImagePreview/ImagePreview";
import ImageWithProducts from "./variants/ImageWithProducts/ImageWithProducts";
// Import utilities
import { typeToClassMap } from "./utils/modalMapper";

// Define the prop types for component
type ModalPropsType = {
  onClickFunction: (e: React.MouseEvent<HTMLDialogElement>) => void; // The function that handles the click event on the modal
  onKeyDownFunction: (e: React.KeyboardEvent<HTMLDialogElement>) => void; // The function that handles the key down event on the modal
};

// Define the modal types
export type ModalTypes =
  | "side-modal"
  | "image-modal"
  | "image-with-products-modal"
  | "menu-modal";

// Export the Modal component with the forwardRef function

/**
 * `Modal` is a React component that renders a modal based on the modal data from the `useModal` hook.
 * It uses several inner components (`SideModalLayout`, `ImagePreview`, `ImageWithProducts`, `MenuLayout`) to provide different modal content.
 *
 * @component
 * @param {(e: React.MouseEvent<HTMLDialogElement>) => void} props.onClickFunction - The function that handles the click event on the modal.
 * @param {(e: React.KeyboardEvent<HTMLDialogElement>) => void} props.onKeyDownFunction - The function that handles the key down event on the modal.
 * @param {ForwardedRef<HTMLDialogElement>} ref - The ref that is forwarded to the dialog element.
 * @returns {JSX.Element} The rendered `InnerComponent` component.
 */

export const Modal = forwardRef(InnerComponent);

function InnerComponent(
  { onKeyDownFunction, onClickFunction }: ModalPropsType,
  ref: ForwardedRef<HTMLDialogElement> // Forward the ref to the dialog element
) {
  const { modalID, modalData } = useModal(); // Get modalID and modalData from useModal custom hook

  const type = modalData?.type; // Get the type of the modal

  // Get the modal class based on the type
  const modalClass = type ? typeToClassMap[type] : undefined;

  // Render the modal based on the type
  return (
    <dialog
      ref={ref} // Forward the ref to the dialog element
      id={modalID} // Set the id of the dialog element
      className={modalClass}
      onClick={onClickFunction} // The function to call when the modal is clicked
      onKeyDown={onKeyDownFunction} // The function to call when a key is pressed on the modal
      data-testid="modal" // Set the data-testid attribute for testing because JSDOM does not support the dialog element
    >
      {modalData &&
        (((type === "choose-color" ||
          type === "choose-size" ||
          type === "product-information" ||
          type === "items-included" ||
          type === "dimensions" ||
          type === "ratings" ||
          type === "installment-purchase" ||
          type === "postal-code" ||
          type === "choose-shop" ||
          type === "preffered-shop" ||
          type === "chosen-shop" ||
          type === "log-in" ||
          type === "refund" ||
          type === "data-encryption" ||
          type === "next-step" ||
          type === "product-control" ||
          type === "shopping-cart-control" ||
          type === "add-product-by-number" ||
          type === "create-list" ||
          type === "create-list-with-products" ||
          type === "list-control" ||
          type === "change-list-name" ||
          type === "delete-list-confirmation" ||
          type === "select-list" ||
          type === "select-list-with-products" ||
          type === "move-to-other-list" ||
          type === "more-options-for-product-in-list" ||
          type === "move-product-from-one-list-to-another" ||
          type === "manage-products-in-list") && (
          <>
            <SideModalLayout data={modalData} />
          </>
        )) ||
          (type === "image-preview" && (
            <>
              <ImagePreview data={modalData} />
            </>
          )) ||
          (type === "image-with-products" && (
            <>
              <ImageWithProducts data={modalData} />
            </>
          )) ||
          ((type === "menu" ||
            type === "products-menu" ||
            type === "rooms-menu") && (
            <>
              <MenuLayout data={modalData} />
            </>
          )))}
    </dialog>
  );
}
