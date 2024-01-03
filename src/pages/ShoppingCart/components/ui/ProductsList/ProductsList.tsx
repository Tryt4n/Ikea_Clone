// Import custom hooks
import useApp from "../../../../../hooks/useApp";
// Import components
import ProductItem from "../../features/ProductItem/ProductItem";

/**
 * ProductsList is a functional component that uses the useApp custom hook to get the application state.
 * It renders an unordered list of ProductItem components, one for each product in the shopping cart.
 * If the shopping cart is empty or undefined, it does not render anything.
 *
 * @returns {JSX.Element} An unordered list of ProductItem components, or null if the shopping cart is empty or undefined.
 */

export default function ProductsList() {
  const { state } = useApp(); // Get the application state using the useApp custom hook.

  return (
    <ul>
      {/* If the shopping cart is not empty or undefined, render a ProductItem component for each product in the shopping cart. */}
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
