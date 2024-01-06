// Import custom hooks
import useApp from "../../../../../../hooks/useApp";
// Import icons
import ShoppingCartIcon from "../../../../../../Icons/ShoppingCartIcon";

/**
 * ShoppingCart
 *
 * Component that serves as the shopping cart for the application. It renders the shopping cart icon and the quantity of items in the cart.
 *
 * The component uses the `useApp` custom hook to access the application state and the `ShoppingCartIcon` component to display the shopping cart icon.
 *
 * The `calculateShoppingCartItemsQuantity` function is used to calculate the total quantity of items in the shopping cart.
 *
 * @returns {JSX.Element} The ShoppingCart component.
 */

export function ShoppingCart() {
  const { state } = useApp(); // Get the state from the application context

  /**
   * calculateShoppingCartItemsQuantity
   *
   * Function to calculate the total quantity of items in the shopping cart. It uses the `shoppingCart` property of the application state to get the list of products in the cart.
   *
   * @returns {number} The total quantity of items in the shopping cart.
   */
  function calculateShoppingCartItemsQuantity() {
    if (!state.shoppingCart) return; // If the shopping cart is empty, return

    let value: number = 0;
    state.shoppingCart.map((product) => {
      value = value += product.quantity;
    });

    return value;
  }

  return (
    <>
      <ShoppingCartIcon />
      {/* The `visually-hidden` class is used to hide the text from the screen, but it is still available to screen readers */}
      <span className="visually-hidden">Koszyk</span>

      {/* If the shopping cart is not empty, display the total quantity of items in the shopping cart */}
      {state && state.shoppingCart && state.shoppingCart.length > 0 && (
        <>
          <span className="visually-hidden">Ilość przedmiotów w koszyku:</span>
          <span
            className="shopping-cart-badge"
            aria-live="polite" // Announce changes to the content of the element
          >
            {/* Display the total quantity of items in the shopping cart */}
            {calculateShoppingCartItemsQuantity()}
          </span>
        </>
      )}
    </>
  );
}
