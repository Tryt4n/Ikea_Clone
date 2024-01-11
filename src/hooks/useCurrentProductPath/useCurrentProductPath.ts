// Import types
import type { Params } from "react-router-dom";

/**
 * Custom React Hook that generates a product path based on the provided parameters.
 *
 * This hook takes a Params object as an argument, which should contain the following properties:
 * - collection: The name of the product collection.
 * - product: The name of the product.
 * - type: The type of the product.
 * - productID: The unique identifier of the product.
 *
 * It returns a string representing the product's path in the format: "/products/{collection}/{product}/{type}/{productID}".
 *
 * @param {Params<string>} path - The parameters used to generate the product path.
 *
 * @returns {string} The generated product path.
 *
 * @example
 * const productPath = useCurrentProductPath({ collection: 'shoes', product: 'sneakers', type: 'men', productID: '123' });
 * // productPath = "/products/shoes/sneakers/men/123"
 */

export default function useCurrentProductPath(path: Params<string>) {
  // If the path object is empty or missing any of the required properties, return an empty string
  if (
    !path ||
    typeof path !== "object" ||
    Object.keys(path).length === 0 ||
    !path.collection ||
    !path.product ||
    !path.type ||
    !path.productID
  ) {
    return "";
  }

  const location = `/products/${path.collection}/${path.product}/${path.type}/${path.productID}`;

  return location;
}
