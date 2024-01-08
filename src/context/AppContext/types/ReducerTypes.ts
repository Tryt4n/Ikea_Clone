// Import types
import type { ShopType } from "../../../constants/shopsList";
import type { FavouritesListType } from "./FavouritesListType";
import type { ShoppingCartType } from "./ShoppingCartType";

export type ReducerStateType = {
  postalCode: string;
  isPostalCodeErrorMessageVisible: boolean;
  postalCodeErrorMessage: string;
  rememberPostalCodeCheckboxStatus: boolean;
  chosenShop?: ShopType;
  shoppingCart?: ShoppingCartType[];
  favouriteLists?: FavouritesListType[];
  editingList?: FavouritesListType;
};

export type ReducerActionsType =
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
      payload: ShoppingCartType[];
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
      type: "restoreList";
      payload: FavouritesListType;
    }
  | {
      type: "loadAppData";
    };
