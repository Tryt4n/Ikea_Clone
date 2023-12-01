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
  "collection" | "productNumber" | "size" | "price" | "variantName" | "images"
> & {
  name: ProductDataType["nameToDisplay"];
  oldPrice?: ProductDataType["oldPriceTag"];
  quantity: number;
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
      type: "loadShoppingCart";
    }
  | {
      type: "addToShoppingCart";
      payload: ShoppingCartType;
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

    // case "addToShoppingCart": {
    //   const shoppingCart = localStorage.getItem("shoppingCart") || [];
    //   const newProduct = action.payload;

    //   if (shoppingCart.length === 0) {
    //     localStorage.setItem("shoppingCart", JSON.stringify([newProduct]));
    //   }

    //   if (shoppingCart.length !== 0 && state.shoppingCart) {
    //     const oldShoppingCart = state.shoppingCart;
    //     // const newShoppingCart = [...oldShoppingCart, newProduct];

    //     //!
    //     const existingProductIndex = state.shoppingCart.findIndex(
    //       (product) => product.productNumber === newProduct.productNumber
    //     );
    //     if (existingProductIndex !== -1) {
    //       const updatedShoppingCart = [...state.shoppingCart];
    //       updatedShoppingCart[existingProductIndex].quantity += newProduct.quantity;
    //       localStorage.setItem("shoppingCart", JSON.stringify(updatedShoppingCart));
    //       // state.shoppingCart[existingProductIndex].quantity += newProduct.quantity
    //     } else {
    //       const newShoppingCart = [...oldShoppingCart, newProduct];
    //       localStorage.setItem("shoppingCart", JSON.stringify(newShoppingCart));
    //     }
    //   }
    //   //!

    //   // localStorage.setItem("shoppingCart", JSON.stringify(newShoppingCart));
    //   // }

    //   return {
    //     ...state,
    //   };
    // }

    case "loadShoppingCart": {
      const storage = localStorage.getItem("shoppingCart");
      let shoppingCartValue: ShoppingCartType[];

      if (storage) {
        shoppingCartValue = JSON.parse(storage);
        return { ...state, shoppingCart: shoppingCartValue };
      }
      // else {
      // shoppingCartValue = state.shoppingCart;
      // }

      return { ...state };
      // return {
      //   ...state,
      //   shoppingCart: shoppingCartValue,
      // };
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
    const postalCode = localStorage.getItem("postalCode");
    if (postalCode) {
      dispatch({ type: "setPostalCode", payload: postalCode });
    }

    const storageCheckboxStatus = localStorage.getItem("rememberPostalCodeCheckboxStatus");
    const checkboxValue = storageCheckboxStatus === "true" ? true : false;
    if (storageCheckboxStatus) {
      dispatch({ type: "togglePostalCodeCheckbox", payload: checkboxValue });
    }

    const chosenShopStorage = localStorage.getItem("chosenShop");
    const chosenShop = shopsList.find((shop) => shop.name === chosenShopStorage);
    if (chosenShopStorage && chosenShop) {
      dispatch({ type: "chooseShop", payload: chosenShop });
    }

    // const shoppingCart = localStorage.getItem("shoppingCart");
    // if (shoppingCart) {
    //   dispatch({ type: "addToShoppingCart", payload: JSON.parse(shoppingCart) });
    // }
    // const shoppingCart = localStorage.getItem("shoppingCart");
    // if (shoppingCart) {
    //   dispatch({ type: "loadShoppingCart" });
    // }

    //? Load ShoppingCart
    dispatch({ type: "loadShoppingCart" });
  }, []);

  //!
  // useEffect(() => {
  //   const shoppingCart = localStorage.getItem("shoppingCart");
  //   if (shoppingCart) {
  //     state.shoppingCart = JSON.parse(shoppingCart);
  //   }
  // }, [state]);
  //!

  useEffect(() => {
    console.log(state);
  }, [state]);

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
