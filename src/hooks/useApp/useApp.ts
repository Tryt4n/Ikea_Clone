// Import Context
import { useContext } from "react";
import { AppContext } from "../../context/AppContext/AppContext";

/**
 * Custom React Hook that provides access to the AppContext.
 *
 * This hook is a shortcut to useContext(AppContext) with additional error checking.
 * It ensures that the hook is used within components wrapped by AppContextProvider.
 * If not, it throws an error.
 *
 * @returns {object} The context value exposed by AppContextProvider.
 *
 * @throws {Error} If the hook is used outside of the AppContextProvider.
 *
 * @example
 * const appContext = useApp();
 */
export default function useApp() {
  const modal = useContext(AppContext);

  if (modal == null) {
    throw new Error("useApp must be used within AppContextProvider");
  }

  return modal;
}
