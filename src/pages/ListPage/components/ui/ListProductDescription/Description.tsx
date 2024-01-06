// Import helper functions
import { calculatePrice } from "../../../../../utils/calculatePrice";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/AppContext";

// Define types for the component props
type DescriptionType = {
  nameToDisplay: ShoppingCartType["nameToDisplay"]; // The name of the product to be displayed.
  variantName: ShoppingCartType["variantName"]; // The variant name of the product.
  price: ShoppingCartType["price"]; // The price of the product.
  size: ShoppingCartType["size"]; // The size of the product.
  quantity: ShoppingCartType["quantity"]; // The quantity of the product.
  oldPrice: ShoppingCartType["oldPrice"]; // The lowest price of the product in the last 30 days.
};

/**
 * Description is a functional component that receives nameToDisplay, variantName, price, size, quantity, and oldPrice as props.
 * It calculates the total price of the product based on the quantity and price.
 * It renders a description of the product, including its name, variant name, size, quantity, price per unit, total price, and the lowest price in the last 30 days.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.nameToDisplay - The name of the product to be displayed.
 * @param {string} props.variantName - The variant name of the product.
 * @param {Object} props.price - The price of the product.
 * @param {string} props.size - The size of the product.
 * @param {number} props.quantity - The quantity of the product.
 * @param {Object} props.oldPrice - The lowest price of the product in the last 30 days.
 *
 * @returns {JSX.Element} A description of the product, including its name, variant name, size, quantity, price per unit, total price, and the lowest price in the last 30 days.
 */

export function Description({
  nameToDisplay,
  variantName,
  size,
  quantity,
  price,
  oldPrice,
}: DescriptionType) {
  const totalPrice = calculatePrice(quantity, price.integer, price.decimal).split(","); // The calculatePrice function returns a string with the total price, e.g. "123,45". We split it into two parts: the integer part and the decimal part.
  const totalPriceInteger = totalPrice[0]; // The integer part of the total price.
  const totalPriceDecimal = totalPrice[1]; // The decimal part of the total price.

  // The component returns a description of the product, including its name, variant name, size, quantity, price per unit, total price, and the lowest price in the last 30 days.
  return (
    <>
      <p>
        {nameToDisplay}, {variantName}
        {/* If the size prop is not equal to "universal" or the quantity prop is greater than 1, the component renders the size and quantity of the product. */}
        {(size !== "universal" || quantity > 1) && ","}
        {price.quantity && ` ${price.quantity} szt./opak.,`}
        {size !== "universal" && ` ${size}`}
      </p>

      {/* If the quantity is greater than 1, the component renders the price per unit. */}
      {quantity > 1 && (
        <p className="fs-sm">
          {price.integer},{price.decimal ? price.decimal : "-"}/szt.
        </p>
      )}

      <strong className="list-product__price">
        {totalPriceInteger}
        <sup>
          <small>,{totalPriceDecimal}</small>
        </sup>
      </strong>

      {/* If the oldPrice prop is passed to the component, the component renders the lowest price in the last 30 days. */}
      {oldPrice && (
        <p className="fs-sm">
          Najniższa cena z ostatnich 30 dni: {oldPrice.integer},
          {oldPrice.decimal ? oldPrice.decimal : "-"}
        </p>
      )}
    </>
  );
}
