// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext";

// Define the ProductDescriptionPropsType props type.
type ProductDescriptionPropsType = {
  nameToDisplay: ShoppingCartType["nameToDisplay"]; // The name of the product to display.
  variantName: ShoppingCartType["variantName"]; // The name of the product variant.
  price: ShoppingCartType["price"]; // The price of the product.
  size: ShoppingCartType["size"]; // The size of the product.
  quantity: ShoppingCartType["quantity"]; // The quantity of the product.
  oldPrice: ShoppingCartType["oldPrice"]; // The old price of the product.
};

/**
 * ProductDescription is a functional component that takes in several props related to a product.
 * It renders a series of paragraphs containing various information about the product.
 *
 * @param {string} nameToDisplay The name of the product to display.
 * @param {string} props.variantName The name of the product variant.
 * @param {object} props.price The price of the product.
 * @param {string} props.size The size of the product.
 * @param {number} props.quantity The quantity of the product.
 * @param {object} props.oldPrice The old price of the product.
 * @returns {JSX.Element} A series of paragraphs containing various information about the product.
 */

export function ProductDescription({
  nameToDisplay,
  variantName,
  price,
  size,
  quantity,
  oldPrice,
}: ProductDescriptionPropsType) {
  const { integer, decimal, quantity: priceQuantity } = price; // Destructure the price object to get the integer, decimal, and quantity values.

  return (
    <>
      {/* Render a paragraph containing the product name and variant name. */}
      <p>
        {nameToDisplay}, {variantName}
      </p>

      {/* If the price quantity exists, render a paragraph containing the price quantity. */}
      {priceQuantity && <p>{priceQuantity} szt./opak.</p>}

      {/* If the size is not "universal", render a paragraph containing the size. */}
      <p>{size !== "universal" && size}</p>

      {/* If the quantity is greater than 1, render a paragraph containing the price per unit. */}
      {quantity > 1 && (
        <p className="fs-sm">
          {integer},{decimal ? decimal : "-"}/szt.
        </p>
      )}

      {/* If the old price exists, render a paragraph containing the old price. */}
      {oldPrice && (
        <p className="fs-sm">
          Najniższa cena z ostatnich 30 dni: {oldPrice.integer},
          {oldPrice.decimal ? oldPrice.decimal : "-"}
        </p>
      )}
    </>
  );
}
