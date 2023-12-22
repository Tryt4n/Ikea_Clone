// React
import { ReactNode, createContext, useMemo, useState } from "react";
// Components
import Toast from "../components/features/Toast/Toast";
// Helpers
import { startViewTransition } from "../utils/helpers";

type ToastDataType = {
  open: boolean;
  text: string;
  link: string;
};

type ToastContextType = {
  toastData: ToastDataType;
  setToastData: (value: ToastDataType) => void;
  closeToast: () => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

const initToast = {
  open: false,
  text: "",
  link: "#",
};

export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [toastData, setToastData] = useState(initToast);

  function closeToast() {
    startViewTransition(() => {
      setToastData(initToast);
    });
  }

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
      <Toast />
    </ToastContext.Provider>
  );
}
