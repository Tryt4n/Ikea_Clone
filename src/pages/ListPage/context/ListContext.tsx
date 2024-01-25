// Import React dependencies
import {
  Dispatch,
  ReactNode,
  createContext,
  useMemo,
  useReducer,
  useState,
} from "react";
// Import reducer function
import { listReducer } from "./utils/listReducer";
// Import constants
import { listDisplays } from "../constants/constants";
// Import types
import type { ShoppingCartType } from "../../../context/AppContext/types/ShoppingCartType";
import type { FavouritesListType } from "../../../context/AppContext/types/FavouritesListType";

// Define the type for the ListContext
type ListContextType = {
  listState: ListReducerStateType; // The current list state
  listDispatch: Dispatch<ListReducerActionsType>; // A function to dispatch actions to the list reducer
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
export type ListReducerStateType = ExtendedFavouriteListType | undefined; // The type for the list reducer state

// Define the type for the list reducer actions
export type ListReducerActionsType =
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
