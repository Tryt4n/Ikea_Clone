// Import utility function
import { addThousandSeparator } from "../../../../utils/addThousandSeparator";

// Define the type for the ListItemPrice props
type ListItemPricePropsType = {
  price: number; // The price of the item
  priceDecimal?: number; // Optional decimal part of the price
  quantity?: number; // Optional quantity of the item
  sizeInMeters?: number; // Optional size of the item in meters
};

/**
 * ListItemPrice component
 *
 * This component displays the price of an item, optionally with a decimal part, quantity, and size in meters.
 * The price is formatted with a thousand separator.
 *
 * @param price - The price of the item.
 * @param priceDecimal - Optional decimal part of the price.
 * @param quantity - Optional quantity of the item.
 * @param sizeInMeters - Optional size of the item in meters.
 *
 * @returns A strong element with a div that contains the formatted price, optionally with a decimal part, quantity, and size in meters.
 */

export function ListItemPrice({
  price,
  priceDecimal,
  quantity,
  sizeInMeters,
}: ListItemPricePropsType) {
  const formattedPrice = addThousandSeparator(price); // Format the price with a thousand separator

  return (
    <strong>
      <div className="collection-list__item-price">
        {formattedPrice}

        {/* If there is a decimal part of the price, render it */}
        {priceDecimal ? (
          <sup>
            <small>&nbsp;,{priceDecimal}</small>
          </sup>
        ) : (
          <small>,-</small>
        )}

        {/* If there is a quantity, render it */}
        {quantity && <small> /{quantity} szt.</small>}

        {/* If there is a size in meters, render it */}
        {sizeInMeters && (
          <small className="collection-list__item-size-in-meters">
            &nbsp;/{sizeInMeters} m
          </small>
        )}
      </div>
    </strong>
  );
}
