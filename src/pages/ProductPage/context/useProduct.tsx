// Import context
import { useContext } from "react";
import { ProductContext } from "./ProductContext";

/**
 * Custom React Hook that provides access to the ProductContext.
 *
 * This hook is a shortcut to useContext(ProductContext) with additional error checking.
 * It ensures that the hook is used within components wrapped by ProductContextProvider.
 * If not, it throws an error.
 *
 * @returns {object} The context value exposed by ProductContextProvider.
 *
 * @throws {Error} If the hook is used outside of the ProductContextProvider.
 *
 * @example
 * const appContext = useProduct();
 */

export default function useProduct() {
  const product = useContext(ProductContext);

  if (product == null) {
    throw new Error("useProduct must be used within ProductProvider");
  }

  return product;
}
