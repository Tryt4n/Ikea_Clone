// Import react dependencies
import React from "react";
// Import custom hooks
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import components
import CollectionProduct from "../CollectionProduct/CollectionProduct";
// Import types
import type { ProductType } from "../CollectionProductsList/CollectionProductsList";

/**
 * `CollectionProducts` is a React component that renders a list of products in a collection.
 *
 * It uses the `useWindowSize` custom hook to get the current window size and hides the product if the window size is less than 600px and the product is marked to be hidden on mobile.
 *
 * The component receives a `products` array and an optional `hideTooltips` boolean as props. Each object in the `products` array should contain the following properties:
 * - `id`: a unique identifier for the product.
 * - `hideOnMobile`: a boolean that indicates whether the product should be hidden on mobile devices.
 *
 * If `hideTooltips` is true, tooltips will be hidden.
 *
 * @param {Object} props The properties passed to the component.
 * @param {Object[]} props.products The product data.
 * @param {boolean} [props.hideTooltips=false] Whether to hide tooltips.
 *
 * @returns {JSX.Element} The `CollectionProducts` component.
 */

export default function CollectionProducts({
  products,
  hideTooltips,
}: {
  products: ProductType[];
  hideTooltips?: boolean;
}) {
  const { width } = useWindowSize(); // Get the current window size from the `useWindowSize` custom hook

  return (
    <>
      {products.map((product) => {
        // Check if the product should be hidden on mobile
        if (product.hideOnMobile && width < 600) {
          // If the product should be hidden on mobile, return an empty fragment
          return <React.Fragment key={product.id}></React.Fragment>;
        } else {
          // If the product should not be hidden on mobile, return the product list item
          return (
            <CollectionProduct
              key={product.id}
              product={product}
              hideTooltips={hideTooltips}
            />
          );
        }
      })}
    </>
  );
}
