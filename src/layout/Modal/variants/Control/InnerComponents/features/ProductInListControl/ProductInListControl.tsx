// Import custom hooks
import useApp from "../../../../../../../hooks/useApp";
import useModal from "../../../../../../../hooks/useModal";
import useToast from "../../../../../../../hooks/useToast";
// Import components
import { ListItem } from "../../ui/ListItem/ListItem";
// Import helpers functions
import { startViewTransition } from "../../../../../../../utils/helpers";
// Import icons
import ArrowRightIcon from "../../../../../../../Icons/ArrowRightIcon";
import MagnifierIcon from "../../../../../../../Icons/MagnifierIcon";
import TrashIcon from "../../../../../../../Icons/TrashIcon";

/**
 * `ProductInListControl` is a React component that provides controls for a product in a list.
 * It uses several custom hooks (`useApp`, `useModal`, `useToast`) to manage state and actions.
 * It also uses the `ListItem` component to create the list items.
 * The component does not receive any props.
 *
 * @returns {JSX.Element} The rendered `ProductInListControl` component.
 */

export function ProductInListControl() {
  const { dispatch } = useApp(); // Get dispatch from useApp hook
  const { modalData, setModalData, closeModal } = useModal(); // Get modalData, setModalData, closeModal from useModal hook
  const { setToastData } = useToast(); // Get setToastData from useToast hook

  // Get the current location's pathname and extract the listId
  const { pathname } = location;
  const listId = pathname.split("/favourites/")[1];

  /**
   * `moveProductToOtherList` is a function that handles moving a product to another list.
   * It uses the `startViewTransition` helper function to start a view transition.
   * It also uses the `setModalData` function from the `useModal` hook to set the modal data after the product is moved.
   */
  function moveProductToOtherList() {
    if (modalData && modalData.type === "more-options-for-product-in-list") {
      startViewTransition(() => {
        setModalData({
          type: "move-product-from-one-list-to-another",
          products: [modalData.products[0]], // The modalData.products array contains only one product
          originalListId: listId,
        });
      });
    }
  }

  /**
   * `removeProduct` is a function that handles removing a product from the list.
   * It uses the `startViewTransition` helper function to start a view transition.
   * It also uses the `setToastData` function from the `useToast` hook to set the toast notification after the product is removed.
   * Finally, it uses the `dispatch` function from the `useApp` hook to dispatch the delete action.
   */
  function removeProduct() {
    if (modalData && modalData.type === "more-options-for-product-in-list") {
      // Set the toast notification
      setToastData({
        open: true,
        text: `Usunięto ${modalData.products[0].collection} z twojej listy.`,
        prevState: () =>
          startViewTransition(() => {
            dispatch({
              type: "addProductsToList",
              payload: { listId: listId, products: [modalData.products[0]] },
            });
          }),
      });

      startViewTransition(() => {
        dispatch({
          type: "deleteProductsFromList",
          payload: { listId: listId, productNumbers: [modalData.products[0].productNumber] },
        });
      });

      closeModal();
    }
  }

  return (
    <>
      <ListItem onClick={moveProductToOtherList}>
        <ArrowRightIcon />
        Przenieś do innej listy
      </ListItem>

      <ListItem onClick={removeProduct}>
        <TrashIcon />
        Usuń z listy
      </ListItem>

      {modalData && modalData.type === "more-options-for-product-in-list" && (
        <ListItem>
          <MagnifierIcon />
          Produkt podobny do {modalData.products[0].collection}
        </ListItem>
      )}
    </>
  );
}
