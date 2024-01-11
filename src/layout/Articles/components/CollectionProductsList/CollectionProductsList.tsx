// Import react dependencies
import React from "react";
// Import custom hooks
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import components
import Collection from "../../../../compoundComponents/CollectionProducts/layout/Collection";
// Import types
import type { ListItemDescriptionPlacementTypes } from "../../../../types/collectionTypes";
import type { TextVariants } from "../../../../types/colorsVariantsType";

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
 * The component uses the `Collection` component to create the product list and the `Collection.ListItem` component to render the products.
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
  const { width } = useWindowSize(); // Get the current window size from the `useWindowSize` custom hook

  return (
    <Collection
      showOnlyOnHover={onHoverStatus} // Show the product list only on hover if the `onHoverStatus` parameter is true
    >
      {products.map((product) => {
        const {
          placement,
          id,
          productLink,
          descriptionPlacement,
          topSellerTag,
          newTag,
          newPriceTag,
          productHeading,
          productSubHeading,
          productPriceInteger,
          productPriceDecimal,
          productQuantity,
          productSizeInMeters,
          hideOnMobile,
        } = product; // Destructure product data

        // Check if the product should be hidden on mobile
        if (hideOnMobile && width < 600) {
          // If the product should be hidden on mobile, return an empty fragment
          return <React.Fragment key={id}></React.Fragment>;
        } else {
          // If the product should not be hidden on mobile, return the product list item
          return (
            <Collection.ListItem
              key={id}
              descriptionContainerId={id} // Set the ID of the product list item description container
              top={
                placement.topMobile
                  ? width >= 600
                    ? placement.top
                    : placement.topMobile
                  : placement.top
              } // Set the top position of the product list item
              right={
                placement.rightMobile
                  ? width >= 600
                    ? placement.right
                    : placement.rightMobile
                  : placement.right
              } // Set the right position of the product list item
              bottom={
                placement.bottomMobile
                  ? width >= 600
                    ? placement.bottom
                    : placement.bottomMobile
                  : placement.bottom
              } // Set the bottom position of the product list item
              left={
                placement.leftMobile
                  ? width >= 600
                    ? placement.left
                    : placement.leftMobile
                  : placement.left
              } // Set the left position of the product list item
            >
              <Collection.ListItemDescriptionContainer
                id={id}
                linkToProduct={productLink}
                placement={descriptionPlacement}
                className={hideTooltips ? "tooltip-hide" : ""}
              >
                {/* If product has a new tag, render the tag */}
                {newTag && (
                  <Collection.ListItemTag variant={newTag.variant}>Nowość</Collection.ListItemTag>
                )}

                {/* If product has a top seller tag, render the tag */}
                {topSellerTag && (
                  <Collection.ListItemTag variant={topSellerTag.variant}>
                    Top Seller
                  </Collection.ListItemTag>
                )}

                {/* If product has a new price tag, render the tag */}
                {newPriceTag && (
                  <Collection.ListItemTag variant={newPriceTag.variant}>
                    Nowa niższa cena
                  </Collection.ListItemTag>
                )}

                {/* Render the product heading and subheading */}
                <Collection.ListItemHeadingContainer>
                  <Collection.ListItemHeading>{productHeading} </Collection.ListItemHeading>
                  <Collection.ListItemSubHeading>{productSubHeading}</Collection.ListItemSubHeading>
                </Collection.ListItemHeadingContainer>

                {/* Render the product price and quantity */}
                <Collection.ListItemPrice
                  price={productPriceInteger}
                  priceDecimal={productPriceDecimal}
                  quantity={productQuantity}
                  sizeInMeters={productSizeInMeters}
                />

                {/* Render the last price if the product has a new price tag */}
                {newPriceTag && (
                  <Collection.ListItemLastPriceDescription
                    lastPrice={newPriceTag.lastItemPriceInteger}
                    lastPriceDecimal={newPriceTag.lastItemPriceDecimal}
                  />
                )}
              </Collection.ListItemDescriptionContainer>
            </Collection.ListItem>
          );
        }
      })}
    </Collection>
  );
}
