// React
import { Dispatch, ReactNode, createContext, useMemo, useReducer, useState } from "react";
// Helpers
import { getPrice } from "../../../utils/helpers";
// Utils
import { listDisplays } from "./utils";
// Types
import type { FavouritesListType, ShoppingCartType } from "../../../context/AppContext";

type ListContextType = {
  listState: ReducerStateType;
  listDispatch: Dispatch<ReducerActionsType>;
  listId: string;
  selectedDisplay: (typeof listDisplays)[number];
  setSelectedDisplay: (value: (typeof listDisplays)[number]) => void;
  managedProducts: ShoppingCartType[];
  setManagedProducts: Dispatch<React.SetStateAction<ShoppingCartType[]>>;
};

export type SortingTypes = "oldest" | "recent" | "name" | "priceAscending" | "priceDescending";

type ExtendedFavouriteListType = FavouritesListType & { listSorting?: SortingTypes };
type ReducerStateType = ExtendedFavouriteListType | undefined;

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

function listReducer(list: ReducerStateType, action: ReducerActionsType) {
  switch (action.type) {
    case "initList": {
      const initializedList = action.payload;

      if (!initializedList?.products) return initializedList;

      const updatedProducts = initializedList.products.sort(
        (a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()
      );

      const updatedList = {
        ...initializedList,
        products: updatedProducts,
        listSorting: "oldest",
      };

      return updatedList;
    }

    case "sortByName": {
      if (!list?.products) return list;

      const updatedList = {
        ...list,
        products: [...list.products].sort((a, b) => a.collection.localeCompare(b.collection)),
        listSorting: "name",
      };

      return updatedList;
    }

    case "sortByDate": {
      if (!list?.products) return list;

      const time = action.payload;
      const updatedList = {
        ...list,
        products: [...list.products].sort(
          (a, b) =>
            new Date(time === "recent" ? b.addedDate : a.addedDate).getTime() -
            new Date(time === "recent" ? a.addedDate : b.addedDate).getTime()
        ),
        listSorting: time,
      };

      return updatedList;
    }

    case "sortByPrice": {
      if (!list?.products) return list;
      const order = action.payload;

      const sortedProducts = [...list.products].sort((a, b) => {
        const priceA = getPrice(a);
        const priceB = getPrice(b);

        return order === "priceAscending" ? priceA - priceB : priceB - priceA;
      });

      return {
        ...list,
        products: sortedProducts,
        listSorting: order,
      };
    }

    default:
      throw new Error("A case in reducer function has been specified that does not exist.");
  }
}

export const ListContext = createContext<ListContextType | null>(null);

export function ListContextProvider({ children }: { children: ReactNode }) {
  const [listState, listDispatch] = useReducer(listReducer, undefined);

  const [selectedDisplay, setSelectedDisplay] = useState<"buy-online" | "shopping-list">(
    "buy-online"
  );
  const [managedProducts, setManagedProducts] = useState<ShoppingCartType[]>([]);
  const [listId] = useState(location.pathname.split("/favourites/")[1]);

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
    [listState, listId, selectedDisplay, managedProducts, setManagedProducts]
  );

  return <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>;
}
