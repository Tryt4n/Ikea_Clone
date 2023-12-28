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
  | "rating"
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
      type: "restoreShoppingCart";
      payload: ShoppingCartType[];
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
      type: "addProductsToList";
      payload: {
        products: ShoppingCartType[];
        listId: FavouritesListType["id"];
      };
    }
  | {
      type: "deleteProductsFromList";
      payload: {
        productNumbers: ShoppingCartType["productNumber"][];
        listId: FavouritesListType["id"];
      };
    }
  | {
      type: "moveProductsFromOneListToAnother";
      payload: {
        products: ShoppingCartType[];
        originalListId: FavouritesListType["id"];
        listWhereProductIsMovedID: FavouritesListType["id"];
      };
    }
  | {
      type: "changeProductQuantityOnList";
      payload: {
        listId: FavouritesListType["id"];
        productNumber: ShoppingCartType["productNumber"];
        value: "add" | "subtract" | number;
      };
    }
  | {
      type: "loadAppData";
    };
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

    case "restoreShoppingCart": {
      const oldShoppingCart = action.payload;

      localStorage.setItem("shoppingCart", JSON.stringify(oldShoppingCart));

      return {
        ...state,
        shoppingCart: oldShoppingCart,
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

        if (oldList.products && newList.products) {
          const newProducts = newList.products;

          oldList.products = oldList.products.filter(
            (oldProduct) =>
              !newProducts.some(
                (newProduct) => newProduct.productNumber === oldProduct.productNumber
              )
          );

          newList.products = newList.products.map((product) => ({
            ...product,
            addedDate: new Date(),
          }));
        }

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

    case "addProductsToList": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const listId = action.payload.listId;
      const listIndex = lists.findIndex((list: FavouritesListType) => list.id === listId);

      if (!favouriteListsStorage || lists.length === 0) {
        const newList: FavouritesListType = {
          id: listId || crypto.randomUUID(),
          lastEdit: new Date(),
          name: "Moja lista",
          products: [action.payload.products[0]],
        };

        localStorage.setItem("favouriteLists", JSON.stringify([newList]));

        return {
          ...state,
          favouriteLists: [newList],
        };
      }

      const products = action.payload.products;
      const updatedList = { ...lists[listIndex] };

      updatedList.products = updatedList.products || [];

      products.forEach((product) => {
        if (updatedList.products) {
          const existingProductIndex = updatedList.products.findIndex(
            (existingProduct) => existingProduct.productNumber === product.productNumber
          );

          if (existingProductIndex !== -1) {
            //? Increase the quantity of the existing product
            updatedList.products[existingProductIndex].quantity += product.quantity;
          } else {
            //? Add the new product
            updatedList.products.push({
              ...product,
              addedDate: new Date(),
            });
          }
        }
      });

      updatedList.lastEdit = new Date();

      lists[listIndex] = updatedList;

      sortLists(lists);
      localStorage.setItem("favouriteLists", JSON.stringify(lists));

      return {
        ...state,
        shoppingCart: products,
        favouriteLists: lists,
      };
    }

    case "deleteProductsFromList": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const listId = action.payload.listId;
      const productNumbers = action.payload.productNumbers;

      if (lists.length > 0) {
        const listIndex = lists.findIndex((list) => list.id === listId);

        let updatingList = lists[listIndex].products;
        productNumbers.forEach((productNumber) => {
          updatingList = updatingList?.filter((product) => product.productNumber !== productNumber);
        });

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

    case "moveProductsFromOneListToAnother": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);

      const products = action.payload.products.map((product) => ({
        ...product,
        addedDate: new Date(),
      }));
      const originalListId = action.payload.originalListId;
      const listWhereProductIsMovedID = action.payload.listWhereProductIsMovedID;

      const originalListIndex = lists.findIndex((list) => list.id === originalListId);
      const listWhereProductIsMovedIndex = lists.findIndex(
        (list) => list.id === listWhereProductIsMovedID
      );

      let originalListProducts = lists[originalListIndex].products;
      let listWhereProductIsMovedProducts = lists[listWhereProductIsMovedIndex].products;

      if (!listWhereProductIsMovedProducts) {
        listWhereProductIsMovedProducts = [];
        lists[listWhereProductIsMovedIndex].products = listWhereProductIsMovedProducts;
      }

      if (originalListProducts) {
        products.forEach((product) => {
          if (!originalListProducts || !listWhereProductIsMovedProducts) return;

          originalListProducts = originalListProducts.filter(
            (p) => p.productNumber !== product.productNumber
          );

          const existingProductIndex = listWhereProductIsMovedProducts.findIndex(
            (existingProduct) => existingProduct.productNumber === product.productNumber
          );

          if (existingProductIndex !== -1) {
            //? Increase the quantity of the existing product and update the addedDate
            listWhereProductIsMovedProducts[existingProductIndex].quantity += product.quantity;
            listWhereProductIsMovedProducts[existingProductIndex].addedDate = new Date();
          } else {
            //? Add the new product
            listWhereProductIsMovedProducts.push(product);
          }
        });

        lists[originalListIndex].products = originalListProducts;
        lists[originalListIndex].lastEdit = new Date();
        lists[listWhereProductIsMovedIndex].lastEdit = new Date();

        sortLists(lists);
        localStorage.setItem("favouriteLists", JSON.stringify(lists));

        return {
          ...state,
          favouriteLists: lists,
        };
      }

      return state;
    }

    case "changeProductQuantityOnList": {
      if (!favouriteListsStorage) return state;

      const lists: FavouritesListType[] = JSON.parse(favouriteListsStorage);
      const { listId, productNumber, value } = action.payload;

      const listIndex = lists.findIndex((list) => list.id === listId);
      const currentList = lists[listIndex];
      const searchedProductIndex = currentList.products?.findIndex(
        (product) => product.productNumber === productNumber
      );

      if (
        currentList.products &&
        searchedProductIndex !== undefined &&
        searchedProductIndex !== -1
      ) {
        if (typeof value === "number") {
          currentList.products[searchedProductIndex].quantity = value;
        } else {
          currentList.products[searchedProductIndex].quantity += value === "add" ? 1 : -1;
        }

        currentList.lastEdit = new Date();

        sortLists(lists);
        localStorage.setItem("favouriteLists", JSON.stringify(lists));

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

const initState: ReducerStateType = {
  postalCode: "",
  isPostalCodeErrorMessageVisible: false,
  postalCodeErrorMessage: "",
  rememberPostalCodeCheckboxStatus: true,
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const isDesktop = !("ontouchstart" in window);

  useEffect(() => {
    dispatch({ type: "loadAppData" });
  }, []);

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
