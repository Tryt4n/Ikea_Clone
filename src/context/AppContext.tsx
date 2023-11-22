// React
import { Dispatch, ReactNode, createContext, useEffect, useMemo, useReducer } from "react";
// Constants
import { ShopType } from "../constants/shopsList";

type AppContextType = {
  state: ReducerStateType;
  dispatch: Dispatch<ReducerActionsType>;
};

type ReducerStateType = {
  postalCode: string;
  isErrorMessageVisible: boolean;
  errorMessage: string;
  rememberPostalCodeCheckboxStatus: boolean;
  chosenShop?: ShopType;
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
  | { type: "deletePostalCode" }
  | { type: "chooseShop"; payload: ShopType };

export const AppContext = createContext<AppContextType | null>(null);

function reducer(state: ReducerStateType, action: ReducerActionsType) {
  switch (action.type) {
    case "setPostalCode":
      localStorage.setItem("postalCode", action.payload);
      return {
        ...state,
        postalCode: action.payload,
        isErrorMessageVisible: false,
      };

    case "showErrorMessage":
      return {
        ...state,
        isErrorMessageVisible: true,
        errorMessage: action.payload,
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
      return {
        ...state,
        chosenShop: action.payload,
      };
    }

    default:
      return state;
  }
}

const initState = {
  postalCode: "",
  isErrorMessageVisible: false,
  errorMessage: "",
  rememberPostalCodeCheckboxStatus: true,
  chosenShop: undefined,
};

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);

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
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const contextValues = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
}
