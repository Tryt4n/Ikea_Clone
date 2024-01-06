// Import Context
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext/ToastContext";

/**
 * Custom React Hook that provides access to the ToastContext.
 *
 * This hook is a shortcut to useContext(ToastContext) with additional error checking.
 * It ensures that the hook is used within components wrapped by ToastContextProvider.
 * If not, it throws an error.
 *
 * @returns {object} The context value exposed by ToastContextProvider.
 *
 * @throws {Error} If the hook is used outside of the ToastContextProvider.
 *
 * @example
 * const toastContext = useToast();
 */

export default function useToast() {
  const toast = useContext(ToastContext);

  if (toast == null) {
    throw new Error("useToast must be used within ToastContextProvider");
  }

  return toast;
}
