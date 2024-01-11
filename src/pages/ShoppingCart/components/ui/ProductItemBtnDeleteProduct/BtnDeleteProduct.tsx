// Import custom hooks
import useApp from "../../../../../hooks/useApp/useApp";
import useToast from "../../../../../hooks/useToast/useToast";
// Import helpers functions
import { startViewTransition } from "../../../../../utils/helpers";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";

/**
 * BtnDeleteProduct is a functional component that takes in a product as a prop.
 * It uses the useApp and useToast custom hooks to get the application state, dispatch function, and setToastData function.
 * It renders a button with a "fs-sm" class that calls the removeProductFromShoppingCart function when it is clicked.
 * The removeProductFromShoppingCart function sets the toast data and dispatches an action to remove the product from the shopping cart.
 *
 * @param {ShoppingCartType} product The product passed to the BtnDeleteProduct component.
 * @returns {JSX.Element} A button with a "fs-sm" class.
 */

export function BtnDeleteProduct({ product }: { product: ShoppingCartType }) {
  const { state, dispatch } = useApp(); // Get the application state and dispatch function using the useApp custom hook.
  const { setToastData } = useToast(); // Get the setToastData function using the useToast custom hook.

  // Define a function to remove the product from the shopping cart.
  function removeProductFromShoppingCart() {
    // Set the toast notification data.
    setToastData({
      open: true,
      text: `Usunięto produkt ${product.collection} z koszyka.`,
      prevState: () =>
        startViewTransition(() => {
          // Dispatch an action to restore the shopping cart.
          dispatch({ type: "restoreShoppingCart", payload: state.shoppingCart! });
        }), // Restore the shopping cart function.
    });

    // Start a view transition and dispatch an action to remove the product from the shopping cart.
    startViewTransition(() =>
      dispatch({
        type: "removeProductFromShoppingCart",
        payload: product.productNumber,
      })
    );
  }

  return (
    <button
      type="button"
      className="fs-sm"
      onClick={removeProductFromShoppingCart}
    >
      Usuń produkt
    </button>
  );
}
