// React
import { Dispatch, ReactNode, createContext, useEffect, useMemo, useReducer } from "react";
// date-fns
import compareDesc from "date-fns/compareDesc";
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
      payload: {
        list: FavouritesListType;
        oldListId?: FavouritesListType["id"];
      };
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

function sortLists(lists: FavouritesListType[]) {
  return lists.sort((a, b) => compareDesc(new Date(a.lastEdit), new Date(b.lastEdit)));
}

function reducer(state: ReducerStateType, action: ReducerActionsType) {
  const favouriteListsStorage = localStorage.getItem("favouriteLists");

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
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const newList = action.payload.list;
      const oldListId = action.payload.oldListId;

      if (oldListId) {
        const oldListIndex = lists.findIndex((list) => list.id === oldListId);
        const oldList = lists[oldListIndex];

        newList.products =
          oldList.products &&
          oldList.products.map((product) => {
            return { ...product, addedDate: new Date() };
          });
        oldList.products = undefined;

        oldList.lastEdit = new Date();
        newList.lastEdit = new Date();
      }

      const updatedLists = [newList, ...lists];

      sortLists(updatedLists);
      localStorage.setItem("favouriteLists", JSON.stringify(updatedLists));

      return {
        ...state,
        favouriteLists: updatedLists,
      };
    }

    case "setEditingList": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const editingList = lists.find((list) => list.id === action.payload.id);

      return {
        ...state,
        editingList: editingList,
      };
    }

    case "changeListName": {
      if (!favouriteListsStorage) return state;

      const editingList: FavouritesListType = {
        ...action.payload,
        lastEdit: new Date(),
      };

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const listIndex = lists.findIndex((list) => list.id === editingList.id);

      if (listIndex !== -1) {
        const updatedLists = lists;
        updatedLists[listIndex] = editingList;

        sortLists(updatedLists);
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
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const deletingList = action.payload;

      const updatedLists = lists.filter((list) => list.id !== deletingList);

      sortLists(updatedLists);
      localStorage.setItem("favouriteLists", JSON.stringify(updatedLists));

      return {
        ...state,
        favouriteLists: updatedLists,
        editingList: undefined,
      };
    }

    case "addToList": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const addedProduct = action.payload.product;
      const listId = action.payload.listId;

      if (!favouriteListsStorage || lists.length === 0) {
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

      if (listId && favouriteListsStorage) {
        const listIndex = lists.findIndex((list: FavouritesListType) => list.id === listId);
        const updatingList = lists[listIndex].products;

        if (lists[listIndex].products && updatingList) {
          lists[listIndex].products = [addedProduct, ...updatingList];
        } else {
          lists[listIndex].products = [addedProduct];
        }

        lists[listIndex].lastEdit = new Date();

        sortLists(lists);
        localStorage.setItem("favouriteLists", JSON.stringify(lists));

        return {
          ...state,
          favouriteLists: lists,
        };
      }

      return state;
    }

    case "deleteProductFromList": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const listId = action.payload.listId;
      const productNumber = action.payload.productNumber;

      if (lists.length > 0) {
        const listIndex = lists.findIndex((list) => list.id === listId);

        const updatingList = lists[listIndex].products?.filter(
          (product) => product.productNumber !== productNumber
        );

        if (lists[listIndex].products) {
          lists[listIndex].products = updatingList;
          lists[listIndex].lastEdit = new Date();

          sortLists(lists);
          localStorage.setItem("favouriteLists", JSON.stringify(lists));
        }

        return {
          ...state,
          favouriteLists: lists,
        };
      }

      return state;
    }

    case "moveProductsToOtherList": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const originalListId = action.payload.originalListId;
      const newListId = action.payload.sourceListId;

      const originalListIndex = lists.findIndex((list) => list.id === originalListId);
      const newListIndex = lists.findIndex((list) => list.id === newListId);

      const newListProducts = lists[newListIndex].products;
      const originalListProducts = lists[originalListIndex].products;

      if (originalListProducts) {
        const uniqueProducts = originalListProducts
          .filter((product) => {
            return !newListProducts?.some(
              (newProduct) => newProduct.productNumber === product.productNumber
            );
          })
          .map((product) => {
            return { ...product, addedDate: new Date() };
          });

        if (newListProducts) {
          lists[newListIndex].products = [...uniqueProducts, ...newListProducts];
        } else {
          lists[newListIndex].products = uniqueProducts;
        }
        lists[originalListIndex].products = undefined;
      }

      lists[newListIndex].lastEdit = new Date();
      lists[originalListIndex].lastEdit = new Date();

      sortLists(lists);
      localStorage.setItem("favouriteLists", JSON.stringify(lists));

      return {
        ...state,
        favouriteLists: lists,
      };
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
      let listsValue: FavouritesListType[] = [];
      if (favouriteListsStorage) {
        listsValue = JSON.parse(favouriteListsStorage);
        sortLists(listsValue);
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
