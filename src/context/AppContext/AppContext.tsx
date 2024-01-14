// Import react dependencies
import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
// Import reducer function
import { reducer } from "./utils/reducer";
// Import constants
import { initState } from "./constants/appInitState";
// Import types
import type {
  ReducerActionsType,
  ReducerStateType,
} from "./types/ReducerTypes";

// Define the type for the context
type AppContextType = {
  state: ReducerStateType; // The current state of the application
  dispatch: Dispatch<ReducerActionsType>; // The dispatch function to update the state
  isDesktop: boolean; // A boolean indicating if the current device is a desktop
};

// Create the context with initial value as null
export const AppContext = createContext<AppContextType | null>(null);

/**
 * The AppContextProvider component is a React component that provides the AppContext to its children.
 * It uses the useReducer hook to manage the state of the application and provides the state and dispatch function to the context.
 * It also determines if the current device is a desktop and provides this information to the context.
 *
 * @param {ReactNode} props.children - The children to be rendered within the AppContextProvider
 */

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState); // Use the reducer function to manage the state of the application
  const isDesktop = !("ontouchstart" in window); // Determine if the current device is a desktop

  // Dispatch the "loadAppData" action when the component mounts
  useEffect(() => {
    dispatch({ type: "loadAppData" });
  }, []);

  // Memoize the context values to avoid unnecessary re-renders
  const contextValues = useMemo(
    () => ({
      state,
      dispatch,
      isDesktop,
    }),
    [state, isDesktop],
  );

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
