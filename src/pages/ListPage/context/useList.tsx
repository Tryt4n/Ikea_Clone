import { useContext } from "react";
import { ListContext } from "./ListContext";

export default function useList() {
  const list = useContext(ListContext);

  if (list === null) {
    throw new Error("useList must be used within a ListContextProvider");
  }

  return list;
}
