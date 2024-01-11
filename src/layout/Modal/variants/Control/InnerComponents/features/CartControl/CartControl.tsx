// Import custom hooks
import useApp from "../../../../../../../hooks/useApp/useApp";
import useModal from "../../../../../../../hooks/useModal/useModal";
import useToast from "../../../../../../../hooks/useToast/useToast";
// Import components
import { ListItem } from "../../ui/ListItem/ListItem";
//  Import helpers functions
import { startViewTransition } from "../../../../../../../utils/helpers";
// Import icons
import HeartIcon from "../../../../../../../Icons/HeartIcon";
import ShareIcon from "../../../../../../../Icons/ShareIcon";
import ShoppingCartAddIcon from "../../../../../../../Icons/ShoppingCartAddIcon";
import TrashIcon from "../../../../../../../Icons/TrashIcon";

/**
 * `CartControl` is a React component that provides controls for a shopping cart.
 * It uses several custom hooks (`useApp`, `useModal`, `useToast`) to manage state and actions.
 * It also uses the `ListItem` component to create the list items.
 * The component does not receive any props.
 *
 * @component
 * @returns {JSX.Element} The rendered `CartControl` component.
 */

export function CartControl() {
  const { state, dispatch } = useApp(); // Get state and dispatch from useApp hook
  const { modalData, setModalData, closeModal } = useModal(); // Get modalData, setModalData, closeModal from useModal hook
  const { setToastData } = useToast(); // Get setToastData from useToast hook

  const productsQuantity = state.shoppingCart?.length; // Get the number of products in the shopping cart

  // Open the modal for adding a product by number
  function openAddProductByNumberModal() {
    startViewTransition(() => {
      setModalData({ type: "add-product-by-number" });
    });
  }

  // Open the modal for moving all products from the shopping cart to another list
  function moveAllProductsToList() {
    const products = state.shoppingCart;

    // Check if the products exist and if there is at least one product
    if (products && products.length > 0) {
      startViewTransition(() => {
        setModalData({
          type: "select-list-with-products",
          products: products,
          previousModal: modalData,
        });
      });
    }
  }

  // Clear the shopping cart
  function clearShoppingCart() {
    setToastData({
      open: true,
      text: `Liczba usuniętych artykułów: ${productsQuantity}`,
      prevState: () =>
        startViewTransition(() => {
          dispatch({ type: "restoreShoppingCart", payload: state.shoppingCart! });
        }), // Restore the shopping cart to the previous state on button click in the toast notification
    });

    startViewTransition(() => {
      dispatch({ type: "clearShoppingCart" });
    });

    closeModal();
  }

  return (
    <>
      <ListItem onClick={openAddProductByNumberModal}>
        <ShoppingCartAddIcon />
        Dodaj produkt, wpisując jego numer
      </ListItem>

      {
        // If the shopping cart is not empty render elements
        productsQuantity && productsQuantity > 0 ? (
          <>
            <ListItem onClick={moveAllProductsToList}>
              <HeartIcon />
              Dodaj ({productsQuantity}) {productsQuantity === 1 ? "produkt" : "produktów"} do listy
              zakupowej
            </ListItem>

            <ListItem onClick={clearShoppingCart}>
              <TrashIcon />
              Usuń wszystkie produkty z koszyka
            </ListItem>

            <ListItem>
              <ShareIcon />
              Udostępnij
            </ListItem>
          </>
        ) : null
      }
    </>
  );
}
