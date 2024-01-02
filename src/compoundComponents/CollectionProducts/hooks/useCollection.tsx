import { useContext } from "react";
import { CollectionContext } from "../context/CollectionProductsContext";

export default function useCollection() {
  const collection = useContext(CollectionContext);

  if (collection == null) {
    throw new Error("useCollection must be used within CollectionContextProvider");
  }

  return collection;
}
