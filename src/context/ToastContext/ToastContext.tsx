/**
 * ToastContext.tsx
 *
 * This file contains the definition of the context for the Toast component. This context contains information about the state of the toast,
 * such as the data to be displayed in the toast, functions to open and close the toast.
 *
 * The context is provided by `ToastContextProvider`, which is a wrapper component.
 */

// Import react dependencies
import { type ReactNode, createContext, useMemo, useState } from "react";
// Import Toast component
import Toast from "../../components/features/Toast/Toast";
// Import helpers functions
import { startViewTransition } from "../../utils/helpers";

// Define toast data type
type ToastDataType = {
  open: boolean;
  text: string;
  link?: string;
  alignLeft?: boolean;
  prevState?: () => void;
};

// Define context type
type ToastContextType = {
  toastData: ToastDataType;
  setToastData: (value: ToastDataType) => void;
  closeToast: () => void;
};

// Create context
export const ToastContext = createContext<ToastContextType | null>(null);

// Initial state for the toast
const initToast = {
  open: false,
  text: "",
};

/**
 * ToastContextProvider
 *
 * Component providing the toast context. Contains logic for opening and closing the toast.
 *
 * @param {ReactNode} children - The children of the component, which have access to the toast context.
 */
export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [toastData, setToastData] = useState(initToast); // Set initial state for the toast

  /**
   * closeToast
   *
   * Function to close the toast. Uses the `startViewTransition` helper function to start a transition,
   * then sets the toast data to the initial state.
   */
  function closeToast() {
    startViewTransition(() => {
      setToastData(initToast);
    });
  }

  // Create context values object to be passed to the provider
  const contextValue = useMemo(() => {
    return {
      toastData,
      setToastData,
      closeToast,
    };
  }, [toastData]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Render the toast component */}
      <Toast />
    </ToastContext.Provider>
  );
}
