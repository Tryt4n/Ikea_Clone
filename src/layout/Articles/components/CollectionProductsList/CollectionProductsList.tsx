// Import components
import Collection from "../../../../compoundComponents/CollectionProducts/layout/Collection";
// Import types
import type { ListItemDescriptionPlacementTypes } from "../../../../types/collectionTypes";
import type { TextVariants } from "../../../../types/colorsVariantsType";
import CollectionProducts from "../CollectionProducts/CollectionProducts";

// Define types for the CollectionProductsList component props
export type CollectionProductsListType = {
  products: ProductType[]; // List of products
  onHoverStatus?: boolean; // Whether the hover status is enabled
  hideTooltips?: boolean; // Whether the tooltips should be hidden
};

// Define type for product data
export type ProductType = {
  id: string;
  placement: {
    top: string;
    right: string;
    bottom: string;
    left: string;
    topMobile?: string;
    rightMobile?: string;
    bottomMobile?: string;
    leftMobile?: string;
  };
  newTag?: {
    variant: TextVariants;
  };
  topSellerTag?: {
    variant: TextVariants;
  };
  newPriceTag?: {
    variant: TextVariants;
    lastItemPriceInteger: number;
    lastItemPriceDecimal?: number;
  };
  descriptionPlacement: ListItemDescriptionPlacementTypes;
  productHeading: string;
  productSubHeading: string;
  productLink: string;
  productPriceInteger: number;
  productPriceDecimal?: number;
  productQuantity: number;
  productSizeInMeters: number;
  hideOnMobile?: boolean;
};

/**
 * CollectionProductsList.tsx
 *
 * This file contains the definition of the CollectionProductsList component. This component serves as a product list
 * for the application and is responsible for rendering a list of products with associated details.
 *
 * The CollectionProductsList component uses the `useWindowSize` custom hook to get the current window size.
 *
 * The component uses the `Collection` component to create the product list and the `CollectionProducts` component to render the products.
 *
 * The `ProductType` type is used to define the structure of the product data.
 *
 * The `CollectionProductsList` function is the main component function. It takes a list of products and two optional parameters: `onHoverStatus` and `hideTooltips`.
 * If `onHoverStatus` is true, the product list will only be shown on hover. If `hideTooltips` is true, the tooltips will be hidden.
 *
 * @param {ProductType[]} props.products - The list of products.
 * @param {boolean} props.onHoverStatus - Whether the hover status is enabled.
 * @param {boolean} props.hideTooltips - Whether the tooltips should be hidden.
 * @returns {JSX.Element} The CollectionProductsList component.
 */

export default function CollectionProductsList({
  products,
  onHoverStatus = false,
  hideTooltips = false,
}: CollectionProductsListType) {
  return (
    <Collection
      showOnlyOnHover={onHoverStatus} // Show the product list only on hover if the `onHoverStatus` parameter is true
    >
      <CollectionProducts products={products} hideTooltips={hideTooltips} />
    </Collection>
  );
}
