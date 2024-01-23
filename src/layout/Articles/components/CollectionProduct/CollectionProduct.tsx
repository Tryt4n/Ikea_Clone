// Import custom hooks
import useWindowSize from "../../../../hooks/useWindowSize/useWindowSize";
// Import components
import Collection from "../../../../compoundComponents/CollectionProducts/layout/Collection";
// Import types
import type { ProductType } from "../CollectionProductsList/CollectionProductsList";

/**
 * `CollectionProduct` is a React component that renders a single product in a collection.
 *
 * It uses the `useWindowSize` custom hook to get the current window size and adjusts the placement of the product list item based on the window size.
 *
 * The component receives a `product` object and an optional `hideTooltips` boolean as props. The `product` object should contain the following properties:
 * - `placement`: an object that contains the top, right, bottom, and left positions of the product list item for both desktop and mobile views.
 * - `id`: a unique identifier for the product.
 * - `productLink`: a link to the product's page.
 * - `descriptionPlacement`: the placement of the product description.
 * - `topSellerTag`: an object that indicates whether the product is a top seller.
 * - `newTag`: an object that indicates whether the product is new.
 * - `newPriceTag`: an object that indicates whether the product has a new price.
 * - `productHeading`: the heading of the product.
 * - `productSubHeading`: the subheading of the product.
 * - `productPriceInteger`: the integer part of the product price.
 * - `productPriceDecimal`: the decimal part of the product price.
 * - `productQuantity`: the quantity of the product.
 * - `productSizeInMeters`: the size of the product in meters.
 *
 * If `hideTooltips` is true, tooltips will be hidden.
 *
 * @param {Object} props The properties passed to the component.
 * @param {Object} props.product The product data.
 * @param {boolean} [props.hideTooltips=false] Whether to hide tooltips.
 *
 * @returns {JSX.Element} The `CollectionProduct` component.
 */

export default function CollectionProduct({
  product,
  hideTooltips,
}: {
  product: ProductType;
  hideTooltips?: boolean;
}) {
  const { width } = useWindowSize(); // Get the current window size from the `useWindowSize` custom hook
  const mobileBreakpoint = 600; // Define the mobile breakpoint

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
  } = product; // Destructure product data

  return (
    <Collection.ListItem
      key={id}
      descriptionContainerId={id} // Set the ID of the product list item description container
      top={
        placement.topMobile
          ? width >= mobileBreakpoint
            ? placement.top
            : placement.topMobile
          : placement.top
      } // Set the top position of the product list item
      right={
        placement.rightMobile
          ? width >= mobileBreakpoint
            ? placement.right
            : placement.rightMobile
          : placement.right
      } // Set the right position of the product list item
      bottom={
        placement.bottomMobile
          ? width >= mobileBreakpoint
            ? placement.bottom
            : placement.bottomMobile
          : placement.bottom
      } // Set the bottom position of the product list item
      left={
        placement.leftMobile
          ? width >= mobileBreakpoint
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
          <Collection.ListItemTag variant={newTag.variant}>
            Nowość
          </Collection.ListItemTag>
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
          <Collection.ListItemHeading>
            {productHeading}{" "}
          </Collection.ListItemHeading>
          <Collection.ListItemSubHeading>
            {productSubHeading}
          </Collection.ListItemSubHeading>
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
