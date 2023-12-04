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
> & {
  oldPrice?: Pick<ProductDataType["oldPriceTag"], "integer" | "decimal" | "variant">;
  quantity: number;
  productLink: string;
};

type ReducerStateType = {
  postalCode: string;
  isPostalCodeErrorMessageVisible: boolean;
  postalCodeErrorMessage: string;
  rememberPostalCodeCheckboxStatus: boolean;
  chosenShop?: ShopType;
  shoppingCart?: ShoppingCartType[];
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
      type: "changeProductQuantity";
      payload: {
        value: "add" | "subtract" | number;
        productNumber: string;
      };
    }
  | {
      type: "removeProductFromShoppingCart";
      payload: string;
    }
  | {
      type: "clearShoppingCart";
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

      let updatedShoppingCart;

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

      return {
        ...state,
        postalCode: postalCodeValue,
        rememberPostalCodeCheckboxStatus: postalCodeCheckboxValue,
        chosenShop: chosenShopValue,
        shoppingCart: shoppingCartValue,
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
