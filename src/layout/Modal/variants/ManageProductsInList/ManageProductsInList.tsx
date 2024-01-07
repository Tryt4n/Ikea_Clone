// Import custom hooks
import useApp from "../../../../hooks/useApp";
import useModal from "../../../../hooks/useModal";
import useToast from "../../../../hooks/useToast";
// Import helpers functions
import { startViewTransition } from "../../../../utils/helpers";
// Import utilities
import { productLink } from "../../../../constants/links";
// Import types
import type { ShoppingCartType } from "../../../../context/AppContext/types/ShoppingCartType";
// Import icons
import ArrowRightIcon from "../../../../Icons/ArrowRightIcon";
import TrashIcon from "../../../../Icons/TrashIcon";
// Import styles
import "./index.scss";

/**
 * ManageProductsInList is a React component that renders a modal for managing products in a list.
 * The modal includes a list of products and a control buttons section.
 * The control buttons section includes a button to move the products to another list and a button to delete the products from the list.
 * The component uses the useApp, useModal, and useToast custom hooks, and the startViewTransition utility function.
 *
 * @returns {JSX.Element} - The component that displays a modal for managing products in a list.
 */

export default function ManageProductsInList() {
  const { modalData } = useModal(); // Use the useModal custom hook to get the modalData.

  return (
    <>
      {/* If the modalData is available and the type of the modal is "manage-products-in-list", render the modal. */}
      {modalData && modalData.type === "manage-products-in-list" && (
        <div className="manage-products-modal">
          <ProductsList products={modalData.products} />

          <BtnsControl products={modalData.products} />
        </div>
      )}
    </>
  );
}

/**
 * ProductsList is a React component that renders a list of products.
 * Each product is represented by an image.
 *
 * @param {ShoppingCartType[]} props.products - The data of the products.
 *
 * @example
 * <ProductsList products={products} />
 */

function ProductsList({ products }: { products: ShoppingCartType[] }) {
  return (
    <ul
      className="manage-products-modal__list scrollbar-style scrollbar-style--thin"
      tabIndex={0} // Make the list focusable, because if the images do not fit in the container and the scrollbar appears, the user will not be able to scroll the list with keyboard.
    >
      {/* Map the products array to a list of li elements. */}
      {products.map((product) => {
        const imgSrc = `${productLink}/${product.collection}-${product.name}-${product.variant}__${product.images.main}`; // Set the image source.
        const imgAlt = `${product.collection} ${product.nameToDisplay} ${product.variantName} ${
          product.size !== "universal" ? product.size : ""
        }`; // Set the image alt.

        return (
          <li
            key={product.productNumber}
            className="manage-products-modal__list-item"
          >
            <img
              src={imgSrc}
              alt={imgAlt}
              loading="lazy" // Enable lazy loading.
            />
          </li>
        );
      })}
    </ul>
  );
}

/**
 * BtnsControl is a React component that renders a control buttons section.
 * The control buttons section includes a button to move the products to another list and a button to delete the products from the list.
 * The component uses the useApp, useModal, and useToast custom hooks, and the startViewTransition utility function.
 *
 * @param {ShoppingCartType[]} props.products - The data of the products.
 *
 * @example
 * <BtnsControl products={products} />
 */

function BtnsControl({ products }: { products: ShoppingCartType[] }) {
  const { state, dispatch } = useApp(); // Use the useApp custom hook to get the state and dispatch of the AppContext.
  const { modalData, setModalData, closeModal } = useModal(); // Use the useModal custom hook to get the modalData, setModalData, and closeModal.
  const { setToastData } = useToast(); // Use the useToast custom hook to get the setToastData.

  // Open the select-list modal.
  function openSelectListModal() {
    startViewTransition(() => {
      if (!state.editingList) return; // If the editingList is not available, do nothing.

      setModalData({
        type: "move-product-from-one-list-to-another",
        products: products,
        previousModal: modalData,
        originalListId: state.editingList.id,
      });
    });
  }

  // Delete the products from the list.
  function deleteProductsFromList() {
    // Set toast data to display a toast with a confirmation message.
    setToastData({
      open: true,
      text:
        products.length > 1
          ? `Usunięto (${products.length}) artykuły z twojej listy.` // If the number of products is greater than 1, display a message with the number of products.
          : `${products[0].collection} został usunięty z twojej listy.`, // Otherwise, display a message with the name of the product.
      // If the user clicks on the "Cofnij" button, add the products back to the list.
      prevState: () =>
        startViewTransition(() => {
          if (!state.editingList) return;

          dispatch({
            type: "addProductsToList",
            payload: {
              listId: state.editingList.id,
              products: [...products],
            },
          });
        }),
    });

    startViewTransition(() => {
      if (!state.editingList) return; // If the editingList is not available, do nothing.

      dispatch({
        type: "deleteProductsFromList",
        payload: {
          listId: state.editingList.id,
          productNumbers: [...products.map((product) => product.productNumber)],
        },
      });
    });

    closeModal();
  }

  return (
    <div className="manage-products-modal__btns-wrapper">
      <button
        type="button"
        className="manage-products-modal__btn"
        onClick={openSelectListModal} // Open the select-list modal.
      >
        <ArrowRightIcon />
        <span>Przenieś do innej listy</span>
      </button>

      <button
        type="button"
        className="manage-products-modal__btn"
        onClick={deleteProductsFromList} // Delete the products from the list.
      >
        <TrashIcon />
        <span>Usuń z listy</span>
      </button>
    </div>
  );
}
