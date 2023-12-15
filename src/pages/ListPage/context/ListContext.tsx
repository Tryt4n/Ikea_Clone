// React
import { Dispatch, ReactNode, createContext, useReducer, useState } from "react";
// Types
import type { FavouritesListType } from "../../../context/AppContext";

type ListContextType = {
  list?: FavouritesListType;
  setList: (list: FavouritesListType) => void;
  list2?: ReducerStateType;
  list2Dispatch: Dispatch<ReducerActionsType>;
};

type ReducerStateType = FavouritesListType | undefined;

type ReducerActionsType =
  | {
      type: "sortByOldest";
      list: FavouritesListType;
    }
  | {
      type: "sortByNewest" | "sortByName" | "sortByPriceAscending" | "sortByPriceDescending";
    };

function listReducer(list: ReducerStateType, action: ReducerActionsType) {
  switch (action.type) {
    case "sortByNewest":
      return list;

    case "sortByOldest":
      return list;

    case "sortByName":
      return list;

    case "sortByPriceAscending":
      return list;

    case "sortByPriceDescending":
      return list;

    default:
      throw new Error("A case in reducer function has been specified that does not exist.");
  }
}

export const ListContext = createContext<ListContextType | null>(null);

const initialState: FavouritesListType | undefined = undefined;

export function ListContextProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<FavouritesListType>();

  const [list2, list2Dispatch] = useReducer(listReducer, initialState);

  return (
    <ListContext.Provider value={{ list, setList, list2, list2Dispatch }}>
      {children}
    </ListContext.Provider>
  );
}
