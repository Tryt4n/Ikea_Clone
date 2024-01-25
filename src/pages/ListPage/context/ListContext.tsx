// Import React dependencies
import {
  Dispatch,
  ReactNode,
  createContext,
  useMemo,
  useReducer,
  useState,
} from "react";
// Import helpers function
import { getPrice } from "../../../utils/helpers";
// Import constants
import { listDisplays } from "../constants/constants";
// Import types
import type { ShoppingCartType } from "../../../context/AppContext/types/ShoppingCartType";
import type { FavouritesListType } from "../../../context/AppContext/types/FavouritesListType";

// Define the type for the ListContext
type ListContextType = {
  listState: ReducerStateType; // The current list state
  listDispatch: Dispatch<ReducerActionsType>; // A function to dispatch actions to the list reducer
  listId: string; // The ID of the current list
  selectedDisplay: (typeof listDisplays)[number]; // The currently selected page display
  setSelectedDisplay: (value: (typeof listDisplays)[number]) => void; // A function to set the currently selected page display
  managedProducts: ShoppingCartType[]; // The products currently managed by the user in the list
  setManagedProducts: Dispatch<React.SetStateAction<ShoppingCartType[]>>; // A function to set the products currently managed by the user in the list
};

// Define the type for the list sorting types
export type SortingTypes =
  | "oldest"
  | "recent"
  | "name"
  | "priceAscending"
  | "priceDescending";

type ExtendedFavouriteListType = FavouritesListType & {
  listSorting?: SortingTypes;
}; // The type for the extended list state
type ReducerStateType = ExtendedFavouriteListType | undefined; // The type for the list reducer state

// Define the type for the list reducer actions
export type ReducerActionsType =
  | {
      type: "initList";
      payload: FavouritesListType;
    }
  | {
      type: "sortByName";
    }
  | {
      type: "sortByDate";
      payload: "recent" | "oldest";
    }
  | {
      type: "sortByPrice";
      payload: "priceAscending" | "priceDescending";
    };

// Define the list reducer function
function listReducer(list: ReducerStateType, action: ReducerActionsType) {
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

// Create the ListContext with a default value of null
export const ListContext = createContext<ListContextType | null>(null);

// Define the ListContextProvider component
export function ListContextProvider({ children }: { children: ReactNode }) {
  const [listState, listDispatch] = useReducer(listReducer, undefined); // Use the useReducer hook to manage the list state and dispatch actions

  const [selectedDisplay, setSelectedDisplay] = useState<
    "buy-online" | "shopping-list"
  >("buy-online"); // Use the useState hook to manage the selected display page state

  const [managedProducts, setManagedProducts] = useState<ShoppingCartType[]>(
    [],
  ); // Use the useState hook to manage the managed products state

  const [listId] = useState(location.pathname.split("/favourites/")[1]); // Use the useState hook to get the list id from the location pathname

  // Use the useMemo hook to memoize the context value
  const contextValue = useMemo(
    () => ({
      listState,
      listDispatch,
      listId,
      selectedDisplay,
      setSelectedDisplay,
      managedProducts,
      setManagedProducts,
    }),
    [listState, listId, selectedDisplay, managedProducts, setManagedProducts],
  );

  // Return the ListContextProvider with the context value and the children
  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
}
