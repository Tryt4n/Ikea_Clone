// React
import { Dispatch, ReactNode, createContext, useEffect, useMemo, useReducer } from "react";
// Types
import type { ProductDataType } from "../pages/ProductPage/types/ProductDataType";
// Constants
import { ShopType, shopsList } from "../constants/shopsList";

type AppContextType = {
  state: ReducerStateType;
  dispatch: Dispatch<ReducerActionsType>;
  isDesktop: boolean;
};

export type ShoppingCartType = Pick<
  ProductDataType,
  | "collection"
  | "productNumber"
  | "size"
  | "price"
  | "variantName"
  | "variant"
  | "images"
  | "nameToDisplay"
  | "name"
  | "newTag"
> & {
  oldPrice?: Pick<ProductDataType["oldPriceTag"], "integer" | "decimal" | "variant">;
  quantity: number;
  productLink: string;
  addedDate: Date;
};

export type FavouritesListType = {
  id: string;
  name: string;
  lastEdit: Date;
  products?: ShoppingCartType[];
};

type ReducerStateType = {
  postalCode: string;
  isPostalCodeErrorMessageVisible: boolean;
  postalCodeErrorMessage: string;
  rememberPostalCodeCheckboxStatus: boolean;
  chosenShop?: ShopType;
  shoppingCart?: ShoppingCartType[];
  favouriteLists?: FavouritesListType[];
  editingList?: FavouritesListType;
};

type ReducerActionsType =
  | {
      type: "setPostalCode";
      payload: string;
    }
  | {
      type: "showErrorMessage";
      payload: string;
    }
  | {
      type: "togglePostalCodeCheckbox";
      payload: boolean;
    }
  | {
      type: "deletePostalCode";
    }
  | {
      type: "chooseShop";
      payload: ShopType;
    }
  | {
      type: "addToShoppingCart";
      payload: ShoppingCartType;
    }
  | {
      type: "addProductByNumber";
      payload: ShoppingCartType["productNumber"];
    }
  | {
      type: "changeProductQuantity";
      payload: {
        value: "add" | "subtract" | number;
        productNumber: ShoppingCartType["productNumber"];
      };
    }
  | {
      type: "removeProductFromShoppingCart";
      payload: ShoppingCartType["productNumber"];
    }
  | {
      type: "clearShoppingCart";
    }
  | {
      type: "createNewList";
      payload: FavouritesListType;
    }
  | {
      type: "setEditingList";
      payload: FavouritesListType;
    }
  | {
      type: "changeListName";
      payload: FavouritesListType;
    }
  | {
      type: "deleteList";
      payload: FavouritesListType["id"];
    }
  | {
      type: "addToList";
      payload: {
        product: ShoppingCartType;
        listId?: FavouritesListType["id"];
      };
    }
  | {
      type: "deleteProductFromList";
      payload: {
        productNumber: ShoppingCartType["productNumber"];
        listId: FavouritesListType["id"];
      };
    }
  | {
      type: "moveProductsToOtherList";
      payload: {
        originalListId: FavouritesListType["id"];
        sourceListId: FavouritesListType["id"];
      };
    }
  | {
      type: "loadAppData";
    };

export const AppContext = createContext<AppContextType | null>(null);

function reducer(state: ReducerStateType, action: ReducerActionsType) {
  switch (action.type) {
    case "setPostalCode":
      localStorage.setItem("postalCode", action.payload);
      return {
        ...state,
        postalCode: action.payload,
        isPostalCodeErrorMessageVisible: false,
      };

    case "showErrorMessage":
      return {
        ...state,
        isPostalCodeErrorMessageVisible: true,
        postalCodeErrorMessage: action.payload,
      };

    case "togglePostalCodeCheckbox": {
      localStorage.setItem("rememberPostalCodeCheckboxStatus", action.payload.toString());

      return {
        ...state,
        rememberPostalCodeCheckboxStatus: action.payload,
      };
    }

    case "deletePostalCode": {
      localStorage.removeItem("postalCode");

      return {
        ...state,
        postalCode: "",
      };
    }

    case "chooseShop": {
      localStorage.setItem("chosenShop", action.payload.name);

      return {
        ...state,
        chosenShop: action.payload,
      };
    }

    case "addToShoppingCart": {
      const shoppingCart: ShoppingCartType[] = JSON.parse(
        localStorage.getItem("shoppingCart") || "[]"
      );
      const newProduct = action.payload;

      let updatedShoppingCart: ShoppingCartType[];

      if (shoppingCart.length === 0) {
        updatedShoppingCart = [newProduct];
      } else {
        const existingProductIndex = shoppingCart.findIndex(
          (product) => product.productNumber === newProduct.productNumber
        );

        if (existingProductIndex !== -1) {
          updatedShoppingCart = [...shoppingCart];
          updatedShoppingCart[existingProductIndex].quantity += newProduct.quantity;
        } else {
          updatedShoppingCart = [...shoppingCart, newProduct];
        }
      }

      localStorage.setItem("shoppingCart", JSON.stringify(updatedShoppingCart));

      return {
        ...state,
        shoppingCart: updatedShoppingCart,
      };
    }

    case "addProductByNumber": {
      console.warn(`Should be added product with ${action.payload} number`);

      return state;
    }

    case "changeProductQuantity": {
      const shoppingCart: ShoppingCartType[] = JSON.parse(
        localStorage.getItem("shoppingCart") || "[]"
      );
      const { value, productNumber } = action.payload;
      const searchedProductIndex = shoppingCart.findIndex(
        (product) => product.productNumber === productNumber
      );

      if (searchedProductIndex !== -1) {
        const updatedShoppingCart = [...shoppingCart];

        if (typeof value === "number") {
          updatedShoppingCart[searchedProductIndex].quantity = value;
        } else {
          updatedShoppingCart[searchedProductIndex].quantity += value === "add" ? 1 : -1;
        }

        localStorage.setItem("shoppingCart", JSON.stringify(updatedShoppingCart));

        return {
          ...state,
          shoppingCart: updatedShoppingCart,
        };
      }

      return state;
    }

    case "removeProductFromShoppingCart": {
      const shoppingCart: ShoppingCartType[] = JSON.parse(
        localStorage.getItem("shoppingCart") || "[]"
      );
      const productNumber = action.payload;
      const searchedProductIndex = shoppingCart.findIndex(
        (product) => product.productNumber === productNumber
      );

      if (searchedProductIndex !== -1) {
        shoppingCart.splice(searchedProductIndex, 1);

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

        return {
          ...state,
          shoppingCart,
        };
      }

      return state;
    }

    case "clearShoppingCart": {
      localStorage.removeItem("shoppingCart");

      return {
        ...state,
        shoppingCart: undefined,
      };
    }

    case "createNewList": {
      const lists: FavouritesListType[] = JSON.parse(
        localStorage.getItem("favouriteLists") || "[]"
      );

      const newList = action.payload;

      const updatedLists = [newList, ...lists];

      localStorage.setItem("favouriteLists", JSON.stringify(updatedLists));

      return {
        ...state,
        favouriteLists: updatedLists,
      };
    }

    case "setEditingList": {
      return {
        ...state,
        editingList: action.payload,
      };
    }

    case "changeListName": {
      const editingList: FavouritesListType = {
        ...action.payload,
        lastEdit: new Date(),
      };

      if (!state.favouriteLists) return { ...state };

      const listIndex = state.favouriteLists.findIndex((list) => list.id === editingList.id);

      if (listIndex !== -1) {
        const updatedLists = [...state.favouriteLists];
        updatedLists[listIndex] = editingList;

        localStorage.setItem("favouriteLists", JSON.stringify(updatedLists));

        return {
          ...state,
          favouriteLists: updatedLists,
          editingList: undefined,
        };
      }

      return {
        ...state,
        editingList: undefined,
      };
    }

    case "deleteList": {
      const deletingList = action.payload;

      if (!state.favouriteLists) return { ...state };

      const updatedLists: FavouritesListType[] = state.favouriteLists.filter(
        (list) => list.id !== deletingList
      );

      localStorage.setItem("favouriteLists", JSON.stringify(updatedLists));

      return {
        ...state,
        favouriteLists: updatedLists,
        editingList: undefined,
      };
    }

    case "addToList": {
      const favouriteLists = localStorage.getItem("favouriteLists");

      const lists = state.favouriteLists;
      const addedProduct = action.payload.product;
      const listId = action.payload.listId;

      if (!favouriteLists) {
        const newList: FavouritesListType = {
          id: crypto.randomUUID(),
          lastEdit: new Date(),
          name: "Moja lista",
          products: [addedProduct],
        };

        localStorage.setItem("favouriteLists", JSON.stringify([newList]));

        return {
          ...state,
          favouriteLists: [newList],
        };
      }

      if (listId && lists) {
        const listIndex = lists.findIndex((list) => list.id === listId);

        const updatingList = lists[listIndex].products;

        if (lists[listIndex].products && updatingList) {
          lists[listIndex].products = [addedProduct, ...updatingList];
        } else {
          lists[listIndex].products = [addedProduct];
        }

        localStorage.setItem("favouriteLists", JSON.stringify(lists));

        return {
          ...state,
          favouriteLists: lists,
        };
      }

      return state;
    }

    case "deleteProductFromList": {
      const lists = state.favouriteLists;
      const listId = action.payload.listId;
      const productNumber = action.payload.productNumber;

      if (lists) {
        const listIndex = lists.findIndex((list) => list.id === listId);

        const updatingList = lists[listIndex].products?.filter(
          (product) => product.productNumber !== productNumber
        );

        if (lists[listIndex].products) {
          lists[listIndex].products = updatingList;

          localStorage.setItem("favouriteLists", JSON.stringify(lists));
        }

        return {
          ...state,
          favouriteLists: lists,
        };
      }

      return state;
    }

    case "loadAppData": {
      //? Postal Code
      const postalCodeStorage = localStorage.getItem("postalCode");
      let postalCodeValue = state.postalCode;
      if (postalCodeStorage) {
        postalCodeValue = postalCodeStorage;
      }

      //? Postal Code Checkbox
      const postalCodeCheckboxStorage = localStorage.getItem("rememberPostalCodeCheckboxStatus");
      let postalCodeCheckboxValue = state.rememberPostalCodeCheckboxStatus;
      if (postalCodeCheckboxStorage) {
        postalCodeCheckboxValue = postalCodeCheckboxStorage === "true";
      }

      //? Chosen Shop
      const chosenShopStorage = localStorage.getItem("chosenShop");
      let chosenShopValue: ShopType | undefined;
      if (chosenShopStorage) {
        chosenShopValue = shopsList.find((shop) => shop.name === chosenShopStorage);
      }

      //? Shopping Cart
      const shoppingCartStorage = localStorage.getItem("shoppingCart");
      let shoppingCartValue: ShoppingCartType[] = [];
      if (shoppingCartStorage) {
        shoppingCartValue = JSON.parse(shoppingCartStorage);
      }

      //? Lists
      const listsStorage = localStorage.getItem("favouriteLists");
      let listsValue;
      if (listsStorage) {
        listsValue = JSON.parse(listsStorage);
      }

      return {
        ...state,
        postalCode: postalCodeValue,
        rememberPostalCodeCheckboxStatus: postalCodeCheckboxValue,
        chosenShop: chosenShopValue,
        shoppingCart: shoppingCartValue,
        favouriteLists: listsValue,
      };
    }

    case "moveProductsToOtherList": {
      if (!state.favouriteLists) return { ...state };

      const lists = state.favouriteLists;
      const originalListId = action.payload.originalListId;
      const newListId = action.payload.sourceListId;

      const originalListIndex = lists.findIndex((list) => list.id === originalListId);
      const newListIndex = lists.findIndex((list) => list.id === newListId);

      const newListProducts = lists[originalListIndex].products;
      const originalListProducts = lists[originalListIndex].products;

      if (newListProducts && originalListProducts) {
        const uniqueProducts = originalListProducts.filter((product) => {
          return !newListProducts.some(
            (newProduct) => newProduct.productNumber === product.productNumber
          );
        });

        lists[newListIndex].products = [...newListProducts, ...uniqueProducts];
        lists[originalListIndex].products = undefined;
      }

      localStorage.setItem("favouriteLists", JSON.stringify(lists));

      return {
        ...state,
        favouriteLists: lists,
      };
    }

    default:
      throw new Error("A case in reducer function has been specified that does not exist.");
  }
}

const initState = {
  postalCode: "",
  isPostalCodeErrorMessageVisible: false,
  postalCodeErrorMessage: "",
  rememberPostalCodeCheckboxStatus: true,
};

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const isDesktop = !("ontouchstart" in window);

  useEffect(() => {
    dispatch({ type: "loadAppData" });
  }, []);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const contextValues = useMemo(
    () => ({
      state,
      dispatch,
      isDesktop,
    }),
    [state, isDesktop]
  );

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
}
