// Import react dependencies
import { memo } from "react";
// Import custom hooks
import useList from "../../context/useList";
// Import components
import ListProduct from "../../components/features/ListProduct/ListProduct";

/**
 * Component is a functional component that uses the useList custom hook to get the list of products.
 * It renders a fragment that maps over the list of products and for each product, it renders a ListProduct component with the product as a prop.
 *
 * @returns {JSX.Element} A fragment that maps over the list of products and for each product, it renders a ListProduct component with the product as a prop.
 */
function Component() {
  const { listState: list } = useList(); // Destructure the listState variable from the useList custom hook.

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

// Export the Component as BuyOnlineGrid using the memo function from React to optimize performance by avoiding unnecessary re-renders.
export const BuyOnlineGrid = memo(Component);
