// Custom Hooks
import useApp from "../../../../hooks/useApp";
// Components
import ProductItem from "../ProductItem/ProductItem";

export default function ProductsList() {
  const { state } = useApp();

  return (
    <ul>
      {state.shoppingCart &&
        state.shoppingCart.map((product) => {
          return (
            <ProductItem
              key={`${product.name}-${product.variantName}`}
              product={product}
            />
          );
        })}
    </ul>
  );
}
