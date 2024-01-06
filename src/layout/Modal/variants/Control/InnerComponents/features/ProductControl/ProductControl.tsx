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
import TrashIcon from "../../../../../../../Icons/TrashIcon";

/**
 * `ProductControl` is a React component that provides controls for a product.
 * It uses several custom hooks (`useApp`, `useModal`, `useToast`) to manage state and actions.
 * It also uses the `ListItem` component to create the list items.
 * The component does not receive any props.
 *
 * @returns {JSX.Element} The rendered `ProductControl` component.
 */

export function ProductControl() {
  const { state, dispatch } = useApp(); // Get state and dispatch from useApp hook
  const { modalData, closeModal, setModalData } = useModal(); // Get modalData, closeModal, setModalData from useModal hook
  const { setToastData } = useToast(); // Get setToastData from useToast hook

  // Add the product to the shopping list
  function addToShoppingList() {
    // Check if the modalData exists and if it is a product-control modal
    if (modalData && modalData.type === "product-control") {
      startViewTransition(() => {
        setModalData({
          type: "select-list",
          product: modalData.product,
        });
      });
    }
  }

  // Remove the product from the shopping cart
  function removeProduct() {
    if (modalData && modalData.type === "product-control") {
      // Set the toast notification
      setToastData({
        open: true,
        text: `${modalData.product.collection} został usunięty z twojego koszyka.`,
        prevState: () =>
          startViewTransition(() => {
            dispatch({ type: "restoreShoppingCart", payload: state.shoppingCart! });
          }), // Restore the shopping cart to the previous state on button click in the toast notification
      });

      dispatch({
        type: "removeProductFromShoppingCart",
        payload: modalData.product.productNumber,
      });

      closeModal();
    }
  }

  return (
    <>
      <ListItem onClick={addToShoppingList}>
        <ArrowRightIcon />
        Przenieś do listy zakupów
      </ListItem>

      <ListItem onClick={removeProduct}>
        <TrashIcon />
        Usuń produkt
      </ListItem>
    </>
  );
}
