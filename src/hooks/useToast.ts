import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export default function useToast() {
  const toast = useContext(ToastContext);

  if (toast == null) {
    throw new Error("useToast must be used within ToastContextProvider");
  }

  return toast;
}
