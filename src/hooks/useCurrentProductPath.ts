import { Params } from "react-router-dom";

export default function useCurrentProductPath(path: Params<string>) {
  const location = `/products/${path.collection}/${path.product}/${path.type}/${path.productID}`;

  return location;
}
