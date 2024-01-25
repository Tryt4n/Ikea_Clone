// Import custom hooks
import useList from "../../../hooks/useList";
// Import constants
import { productLink } from "../../../../../constants/links";

/**
 * ProductsList is a functional component that uses the useList custom hook to get the list of managed products.
 * It renders an unordered list of list items, each containing an image of a product.
 * The image source and alt text are constructed from the product details.
 *
 * @returns {JSX.Element} An unordered list of list items, each containing an image of a product.
 */

export function ProductsList() {
  const { managedProducts } = useList(); // Get the list of managed products from the useList custom hook.

  return (
    <ul
      className="manage-products__list scrollbar-style scrollbar-style--thin"
      tabIndex={0} // Make the list focusable because if it is long enough it would have a scrollbar.
    >
      {managedProducts.map((product) => {
        const imgSrc = `${productLink}/${product.collection}-${product.name}-${product.variant}__${product.images.main}`; // Construct the image source from the product details.

        const imgAlt = `${product.collection} ${product.nameToDisplay} ${product.variantName} ${
          product.size !== "universal" ? product.size : ""
        }`; // Construct the image alt text from the product details.

        return (
          <li
            key={product.productNumber}
            className="manage-products__list-item"
          >
            <img src={imgSrc} alt={imgAlt} loading="lazy" />
          </li>
        );
      })}
    </ul>
  );
}
