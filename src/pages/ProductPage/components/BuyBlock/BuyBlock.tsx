// Import react dependencies
import { ChangeEvent, useState } from "react";
// Import custom hooks
import useApp from "../../../../hooks/useApp/useApp";
import useToast from "../../../../hooks/useToast/useToast";
import useProduct from "../../hooks/useProduct";
// Import components
import QuantityInput from "../../../../components/features/QuantityInput/QuantityInput";
import { Btn } from "../../../../components/ui/Btn/Btn";
// Import utility functions
import { startViewTransition } from "../../../../utils/helpers";
// Import types
import type { ProductDataType } from "../../types/ProductDataType";
// Import styles
import "./index.scss";

/**
 * BuyBlock Component
 *
 * This is a React functional component. It displays a form that allows users to select a quantity of a product and add it to the shopping cart.
 *
 * @param {ProductDataType} product - The product data to be displayed and added to the shopping cart.
 *
 * @example
 * <BuyBlock product={productData} />
 *
 * @returns JSX element that consists of a form with a QuantityInput component and a submit button. The QuantityInput allows users to select a quantity, and the submit button adds the selected quantity of the product to the shopping cart.
 */

export default function BuyBlock({ product }: { product: ProductDataType }) {
  const { dispatch } = useApp(); // Access the dispatch function from the global app state.
  const { setToastData } = useToast(); // Access the setToastData function to manage toast notifications.
  const { path } = useProduct(); // Access the product context.

  const [quantity, setQuantity] = useState(1); // State for the selected quantity of the product.

  // Function to handle changes in the quantity input.
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters.
    const parsedValue = parseInt(filteredValue, 10) || 1; // Parse the filtered value to an integer, default to 1 if parsing fails.

    setQuantity(parsedValue); // Update the quantity state.
  }

  // Function to handle changes in the quantity via the QuantityInput component.
  function handleQuantityChange(delta: -1 | 1) {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta; // Calculate the new quantity.

      // Ensure the new quantity is within the range [1, 99].
      return Math.min(Math.max(newQuantity, 1), 99);
    });
  }

  // Destructure the product data.
  const {
    productNumber,
    collection,
    name,
    nameToDisplay,
    variant,
    variantName,
    size,
    price,
    oldPriceTag,
    images,
    newTag,
    rating,
  } = product;

  // Function to add the product to the shopping cart.
  function addToShoppingCart() {
    // Set current date to the current date without milliseconds
    const currentDate = new Date();
    currentDate.setMilliseconds(0);

    dispatch({
      type: "addToShoppingCart",
      payload: [
        {
          quantity: quantity,
          productNumber: productNumber,
          collection: collection,
          name: name,
          nameToDisplay: nameToDisplay,
          variant: variant,
          variantName: variantName,
          size: size,
          price: price,
          oldPrice: oldPriceTag,
          images: images,
          productLink: `/products/${path.collection}/${path.product}/${path.type}/${path.productID}`,
          newTag: newTag,
          addedDate: currentDate,
          rating: rating,
        },
      ],
    });
    setQuantity(1); // Reset the quantity state.

    // Show a toast notification that the product has been added to the shopping cart.
    startViewTransition(() => {
      setToastData({
        open: true,
        text: `${collection} dodano do koszyka.`,
        link: "/shoppingcart",
      });
    });
  }

  // Render the component.
  return (
    <form
      className="buy-block"
      onSubmit={(e) => e.preventDefault()} // Prevent the default form submission behavior.
    >
      <QuantityInput
        quantity={quantity}
        inputFunction={handleInputChange} // Handle changes in the quantity input.
        onChangeFunction={handleQuantityChange} // Handle changes in the quantity via the buttons in QuantityInput component.
      />

      <Btn
        variant="blue"
        type="submit"
        aria-live="polite" // Announce changes in the button text to screen readers.
        onClick={addToShoppingCart} // Add the product to the shopping cart when the button is clicked.
        data-testid="add-to-cart-btn"
      >
        Dodaj {quantity > 1 && `${quantity} szt. `}do koszyka
      </Btn>
    </form>
  );
}
