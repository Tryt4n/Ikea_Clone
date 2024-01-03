// Import Context
import { useContext } from "react";
import { CollectionContext } from "../context/CollectionProductsContext";

/**
 * Custom React Hook that provides access to the CollectionContext.
 *
 * This hook is a shortcut to useContext(CollectionContext) with additional error checking.
 * It ensures that the hook is used within components wrapped by CollectionContextProvider.
 * If not, it throws an error.
 *
 * @returns {object} The context value exposed by CollectionContextProvider.
 *
 * @throws {Error} If the hook is used outside of the CollectionContextProvider.
 *
 * @example
 * const collectionContext = useCollection();
 */

export default function useCollection() {
  const collection = useContext(CollectionContext);

  if (collection == null) {
    throw new Error("useCollection must be used within CollectionContextProvider");
  }

  return collection;
}
