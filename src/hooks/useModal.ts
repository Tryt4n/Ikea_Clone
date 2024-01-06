// Import Context
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext/ModalContext";

/**
 * Custom React Hook that provides access to the ModalContext.
 *
 * This hook is a shortcut to useContext(ModalContext) with additional error checking.
 * It ensures that the hook is used within components wrapped by ModalContextProvider.
 * If not, it throws an error.
 *
 * @returns {object} The context value exposed by ModalContextProvider.
 *
 * @throws {Error} If the hook is used outside of the ModalContextProvider.
 *
 * @example
 * const modalContext = useModal();
 */

export default function useModal() {
  const modal = useContext(ModalContext);

  if (modal == null) {
    throw new Error("useModal must be used within ModalContextProvider");
  }

  return modal;
}
