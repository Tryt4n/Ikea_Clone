import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export default function useProduct() {
  const product = useContext(ProductContext);

  if (product == null) {
    throw new Error("useProduct must be used within ProductProvider");
  }

  return product;
}
