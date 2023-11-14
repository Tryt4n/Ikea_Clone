// React
import React from "react";
// Custom Hooks
import useWindowSize from "../../../../hooks/useWindowSize";
// Components
import Collection from "../../../../compoundComponents/CollectionProducts/components/Collection";
// Types
import { CollectionProductsListType } from "./CollectionProductsList";

export default function CollectionProductsList({
  products,
  onHoverStatus = false,
  hideTooltips = false,
}: CollectionProductsListType) {
  const { width } = useWindowSize();

  return (
    <Collection showOnlyOnHover={onHoverStatus}>
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
        } = product;

        if (hideOnMobile && width < 600) {
          return <React.Fragment key={id}></React.Fragment>;
        } else {
          return (
            <Collection.ListItem
              key={id}
              descriptionContainerId={id}
              top={
                placement.topMobile
                  ? width >= 600
                    ? placement.top
                    : placement.topMobile
                  : placement.top
              }
              right={
                placement.rightMobile
                  ? width >= 600
                    ? placement.right
                    : placement.rightMobile
                  : placement.right
              }
              bottom={
                placement.bottomMobile
                  ? width >= 600
                    ? placement.bottom
                    : placement.bottomMobile
                  : placement.bottom
              }
              left={
                placement.leftMobile
                  ? width >= 600
                    ? placement.left
                    : placement.leftMobile
                  : placement.left
              }
            >
              <Collection.ListItemDescriptionContainer
                id={id}
                linkToProduct={productLink}
                placement={descriptionPlacement}
                className={hideTooltips ? "tooltip-hide" : ""}
              >
                {newTag && (
                  <Collection.ListItemTag variant={newTag.variant}>Nowość</Collection.ListItemTag>
                )}
                {topSellerTag && (
                  <Collection.ListItemTag variant={topSellerTag.variant}>
                    Top Seller
                  </Collection.ListItemTag>
                )}
                {newPriceTag && (
                  <Collection.ListItemTag variant={newPriceTag.variant}>
                    Nowa niższa cena
                  </Collection.ListItemTag>
                )}
                <Collection.ListItemHeadingContainer>
                  <Collection.ListItemHeading>{productHeading} </Collection.ListItemHeading>
                  <Collection.ListItemSubHeading>{productSubHeading}</Collection.ListItemSubHeading>
                </Collection.ListItemHeadingContainer>
                <Collection.ListItemPrice
                  price={productPriceInteger}
                  priceDecimal={productPriceDecimal}
                  quantity={productQuantity}
                  sizeInMeters={productSizeInMeters}
                />
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
