import { Dispatch, ReactNode, createContext, useEffect, useMemo, useReducer } from "react";

type AppContextType = {
  state: ReducerStateType;
  dispatch: Dispatch<ReducerActionsType>;
};

type ReducerStateType = {
  postalCode: string;
  isErrorMessageVisible: boolean;
  errorMessage: string;
  rememberPostalCodeCheckboxStatus: boolean;
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
    };

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
      const newCheckboxStatus = !state.rememberPostalCodeCheckboxStatus;
      localStorage.setItem("rememberPostalCodeCheckboxStatus", newCheckboxStatus.toString());

      return {
        ...state,
        rememberPostalCodeCheckboxStatus: newCheckboxStatus,
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
};

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const postalCode = localStorage.getItem("postalCode");

    if (postalCode) {
      dispatch({ type: "setPostalCode", payload: postalCode });
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
