// React
import { memo } from "react";
// Custom Hooks
import useList from "../../context/useList";
// Components
import ListProduct from "../../components/ListProduct/ListProduct";

export default function Component() {
  const { listState: list } = useList();

  return (
    <>
      {list?.products &&
        list.products.map((product) => (
          <ListProduct
            key={product.productNumber}
            product={product}
          />
        ))}
    </>
  );
}

export const BuyOnlineGrid = memo(Component);
