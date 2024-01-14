// Import utility function
import { addThousandSeparator } from "../../../../utils/addThousandSeparator";

// Define the type for the ListItemLastPriceDescription props
type ListItemLastPriceDescriptionPropsType = {
  className?: string; // Optional string that determines the CSS class of the component
  lastPrice: number; // The last price of the item
  lastPriceDecimal?: number; // Optional decimal part of the last price
};

/**
 * ListItemLastPriceDescription component
 *
 * This component displays the last price of an item, optionally with a decimal part, and a specified CSS class.
 * The last price is formatted with a thousand separator.
 *
 * @param className - Optional string that determines the CSS class of the component.
 * @param lastPrice - The last price of the item.
 * @param lastPriceDecimal - Optional decimal part of the last price.
 *
 * @returns A p element with a specified CSS class that contains a text and a small element with the formatted last price, optionally with a decimal part.
 */

export function ListItemLastPriceDescription({
  className,
  lastPrice,
  lastPriceDecimal,
}: ListItemLastPriceDescriptionPropsType) {
  const formattedLastPrice = addThousandSeparator(lastPrice); // Format the last price with a thousand separator

  return (
    <p
      className={`collection-list__last-price-text-wrapper${className ? ` ${className}` : ""}`}
    >
      Najniższa cena z 30 dni przed obniżką:
      <small>
        &nbsp;
        {formattedLastPrice},{lastPriceDecimal ? lastPriceDecimal : "-"}
      </small>
    </p>
  );
}
