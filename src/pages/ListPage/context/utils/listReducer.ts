// Import utility functions
import { getPrice } from "../../../../utils/helpers";
// Import types
import type {
  ListReducerActionsType,
  ListReducerStateType,
} from "../ListContext";

/**
 * Reducer function for the ListContext used in a `useReducer` hook.
 *
 * This function takes the current state of the list and an action, and returns a new state based on the action type.
 * The action types it handles are:
 * - "initList": Initializes the list with the payload from the action. If the list has products, they are sorted by the date they were added.
 * - "sortByName": Sorts the products in the list by their collection name.
 * - "sortByDate": Sorts the products in the list by the date they were added, either most recent first or oldest first based on the payload ("recent" or "oldest").
 * - "sortByPrice": Sorts the products in the list by their price, either ascending or descending based on the payload.
 *
 * If an action type is provided that is not handled by the reducer, it throws an error.
 *
 * @param {ListReducerStateType} list - The current state of the list.
 * @param {ListReducerActionsType} action - The action to be performed on the list.
 * @returns {ListReducerStateType} The new state of the list after the action has been performed.
 * @throws {Error} If an action type is provided that is not handled by the reducer.
 */

export function listReducer(
  list: ListReducerStateType,
  action: ListReducerActionsType,
) {
  // Switch on the action type
  switch (action.type) {
    // Handle the "initList" action
    case "initList": {
      // Get the payload from the action
      const initializedList = action.payload;

      // If the list has no products, return the initialized list
      if (!initializedList?.products) return initializedList;

      // Sort the products by the date they were added
      const updatedProducts = initializedList.products.sort(
        (a, b) =>
          new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime(),
      );

      // Create a new list with the sorted products and the list sorting set to "oldest"
      const updatedList = {
        ...initializedList,
        products: updatedProducts,
        listSorting: "oldest",
      };

      // Return the updated list
      return updatedList;
    }

    // Handle the "sortByName" action
    case "sortByName": {
      // If the list has no products, return the list
      if (!list?.products) return list;

      // Create a new list with the products sorted by their collection name and the list sorting set to "name"
      const updatedList = {
        ...list,
        products: [...list.products].sort((a, b) =>
          a.collection.localeCompare(b.collection),
        ),
        listSorting: "name",
      };

      // Return the updated list
      return updatedList;
    }

    // Handle the "sortByDate" action
    case "sortByDate": {
      // If the list has no products, return the list
      if (!list?.products) return list;

      // Get the payload from the action
      const time = action.payload;

      // Create a new list with the products sorted by the date they were added and the list sorting set to the payload value ("recent" or "oldest")
      const updatedList = {
        ...list,
        products: [...list.products].sort(
          (a, b) =>
            new Date(time === "recent" ? b.addedDate : a.addedDate).getTime() -
            new Date(time === "recent" ? a.addedDate : b.addedDate).getTime(),
        ),
        listSorting: time,
      };

      // Return the updated list
      return updatedList;
    }

    // Handle the "sortByPrice" action
    case "sortByPrice": {
      // If the list has no products, return the list
      if (!list?.products) return list;

      // Get the payload from the action
      const order = action.payload;

      // Sort the products by their price
      const sortedProducts = [...list.products].sort((a, b) => {
        const priceA = getPrice(a.price);
        const priceB = getPrice(b.price);

        // If the order is "priceAscending", return the difference of priceA and priceB, otherwise return the difference of priceB and priceA
        return order === "priceAscending" ? priceA - priceB : priceB - priceA;
      });

      // Create a new list with the sorted products and the list sorting set to the order value ("priceAscending" or "priceDescending")
      return {
        ...list,
        products: sortedProducts,
        listSorting: order,
      };
    }

    // Handle any other action type
    default:
      // Throw an error if an action type is provided that is not handled by the reducer
      throw new Error(
        "A case in reducer function has been specified that does not exist.",
      );
  }
}
