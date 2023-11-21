import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function useApp() {
  const modal = useContext(AppContext);

  if (modal == null) {
    throw new Error("useApp must be used within AppContextProvider");
  }

  return modal;
}
