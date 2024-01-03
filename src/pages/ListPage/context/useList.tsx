// Import context
import { useContext } from "react";
import { ListContext } from "./ListContext";

/**
 * useList is a custom hook that provides the list context to the component where it is used.
 *
 * It uses the useContext hook to get the current value of the ListContext.
 *
 * If useList is used outside of a ListContextProvider, it throws an error.
 *
 * @returns {Object} The current value of the ListContext.
 *
 * @throws {Error} If useList is used outside of a ListContextProvider.
 */

export default function useList() {
  // Get the current value of the ListContext
  const list = useContext(ListContext);

  // If useList is used outside of a ListContextProvider, throw an error
  if (list === null) {
    throw new Error("useList must be used within a ListContextProvider");
  }

  // Return the current value of the ListContext
  return list;
}
