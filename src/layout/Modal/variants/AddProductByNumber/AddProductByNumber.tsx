// Import react dependencies
import { useState, type ChangeEvent } from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp";
// Import components
import Input from "../../../../components/features/Input/Input";
import QuantityInput from "../../../../components/features/QuantityInput/QuantityInput";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import types
import type { ShoppingCartType } from "../../../../context/AppContext/AppContext";
// Import styles
import "./index.scss";

/**
 * AddProductByNumber is a React component that renders a form for adding a product to the shopping cart by its number.
 * The form includes an input for the product number, a quantity input, and a button for adding the product to the shopping cart.
 * The component uses the useApp custom hook and the useState hook from React.
 *
 * @returns {JSX.Element} - The component that displays the form for adding a product to the shopping cart by its number.
 */

export default function AddProductByNumber() {
  const { dispatch } = useApp(); // Use the useApp custom hook to get the dispatch function.
  const [quantity, setQuantity] = useState(1); // The state for the quantity of the product.
  const [inputText, setInputText] = useState(""); // The state for the text of the product number input.

  /**
   * changeQuantity is a function that changes the quantity of the product.
   *
   * @param {-1 | 1} delta - The change in the quantity of the product.
   */
  function changeQuantity(delta: -1 | 1) {
    setQuantity((prevValue) => (prevValue += delta));
  }

  /**
   * changeQuantityByInputValue is a function that changes the quantity of the product to the value of the input.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The event that triggers the function.
   */
  function changeQuantityByInputValue(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, ""); // Remove all non-numeric characters from the input value.
    const parsedValue = parseInt(filteredValue, 10) || 1; // Parse the input value to an integer. If the input value is not a number, set the quantity to 1.

    setQuantity(parsedValue);
  }

  /**
   * handleTextChange is a function that changes the text of the product number input if the input is valid.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The event that triggers the function.
   */
  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const isValidInput = /^\d{0,3}(\.\d{0,3}(\.\d{0,2})?)?$/.test(value); // Check if the input value is valid. The input value should have the format: 103.242.78

    if (isValidInput) {
      setInputText(value);
    }
  }

  /**
   * addToShoppingCart is a function that dispatches an action to add a product to the shopping cart by its number.
   *
   * @param {ShoppingCartType["productNumber"]} productNumber - The number of the product.
   */
  function addToShoppingCart(productNumber: ShoppingCartType["productNumber"]) {
    dispatch({ type: "addProductByNumber", payload: productNumber });
  }

  return (
    <form
      className="add-product-by-number"
      onSubmit={(e) => e.preventDefault()} // Prevent form from default submitting behavior.
    >
      <Input
        id="add-product-by-number"
        label="np.: 103.242.78"
        type="text" // The type of the input.
        inputProps={{
          value: inputText, // The value of the input.
          onChange: handleTextChange, // The function to call when the input value changes.
          maxLength: 10, // The maximum number of characters that can be entered in the input.
          pattern: "^\\d{0,3}(\\.\\d{0,3}(\\.\\d{0,2})?)?$", // The pattern that the input value must match. The input value should have the format: 103.242.78
          title: "Wprowadzona wartość powinna mieć taki format: 103.242.78",
        }}
      />

      <div className="add-product-by-number__inner-wrapper">
        <QuantityInput
          quantity={quantity}
          onChangeFunction={changeQuantity} // The function to call on the click of the plus or minus button.
          inputFunction={changeQuantityByInputValue} // The function to call when the input value changes.
        />

        <Btn
          variant="blue"
          type="button"
          onClick={() => addToShoppingCart(inputText)} // The function to call when the button is clicked.
        >
          Dodaj do koszyka
        </Btn>
      </div>
    </form>
  );
}
