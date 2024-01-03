// Import react dependencies
import { ChangeEvent } from "react";
// Import custom hooks
import useApp from "../../../../../hooks/useApp";
import useWindowSize from "../../../../../hooks/useWindowSize";
// Import components
import QuantityInput from "../../../../../components/features/QuantityInput/QuantityInput";
import { BtnDeleteProduct } from "../ProductItemBtnDeleteProduct/BtnDeleteProduct";
import { BtnMoveToShoppingList } from "../ProductItemBtnMoveToShoppingList/BtnMoveToShoppingList";
import { BtnProductMenu } from "../ProductItemBtnProductMenu/BtnProductMenu";
// Import helpers functions
import { startViewTransition } from "../../../../../utils/helpers";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext";

// Define the ProductControlsPropsType props type.
type ProductControlsPropsType = {
  quantity: ShoppingCartType["quantity"]; // The quantity of the product.
  product: ShoppingCartType; // The product.
};

/**
 * ProductControls is a functional component that takes in a quantity and a product as props.
 * It uses the useApp and useWindowSize custom hooks to get the dispatch function and the window size.
 * It renders a form containing a QuantityInput component and one or more button components depending on the window size.
 * The QuantityInput component changes the product quantity in the shopping cart when its value is changed.
 * The button components perform various actions on the product.
 *
 * @param {number} quantity The quantity of the product.
 * @param {ShoppingCartType} product The product.
 * @returns {JSX.Element} A form containing a QuantityInput component and one or more button components.
 */

export function ProductControls({ quantity, product }: ProductControlsPropsType) {
  const { dispatch } = useApp(); // Get the dispatch function using the useApp custom hook.
  const { width } = useWindowSize(); // Get the window size using the useWindowSize custom hook.

  // Get the product number from the product.
  const productNumber = product.productNumber;

  // Define a function to change the product quantity in the shopping cart.
  function changeQuantity(delta: -1 | 1) {
    // Start a view transition and dispatch an action to change the product quantity.
    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantity",
        payload: { value: delta === -1 ? "subtract" : "add", productNumber: productNumber }, // If delta is -1, subtract 1 from the product quantity. If delta is 1, add 1 to the product quantity.
      })
    );
  }

  // Define a function to change the product quantity in the shopping cart based on the input value.
  function changeQuantityByInputValue(e: ChangeEvent<HTMLInputElement>) {
    // Get the input value, filter out non-digit characters, and parse it to an integer.
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, ""); // Filter out non-digit characters.
    const parsedValue = parseInt(filteredValue, 10) || 1; // Parse the value to an integer. If the value is NaN, set it to 1.

    // Start a view transition and dispatch an action to change the product quantity.
    startViewTransition(() =>
      dispatch({
        type: "changeProductQuantity",
        payload: { value: parsedValue, productNumber: productNumber }, // Set the product quantity to the parsed value.
      })
    );
  }

  return (
    // Render a form containing a QuantityInput component and one or more button components depending on the window size.
    <form
      className="shopping-cart-product-item__product-controls"
      onSubmit={(e) => e.preventDefault()}
    >
      <QuantityInput
        quantity={quantity}
        onChangeFunction={changeQuantity}
        inputFunction={changeQuantityByInputValue}
        small
      />

      {/* Render the BtnDeleteProduct component if the window width is greater than or equal to 375px. */}
      {width >= 375 && <BtnDeleteProduct product={product} />}

      {/* Render the BtnMoveToShoppingList component if the window width is greater than or equal to 460px. */}
      {width >= 460 && <BtnMoveToShoppingList product={product} />}

      {/* Render the BtnProductMenu component only on small screens size. */}
      {width < 460 && <BtnProductMenu product={product} />}
    </form>
  );
}
