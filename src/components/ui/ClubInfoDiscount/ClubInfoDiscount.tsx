// Import components
import Tag from "../Tag/Tag";
// Import icons
import AvatarIcon from "../../../Icons/AvatarIcon";
// Import constants
import { getClubDiscount } from "../../../constants/clubDiscount";
// Import styles
import "./index.scss";

// Define the type for the ClubInfoDiscount props
type ClubInfoDiscountPropsType = {
  price: number; // The price of the product
  href: string; // The href of the anchor element
};

/**
 * ClubInfoDiscount component
 *
 * This component displays a link with information about the discount available to IKEA Family Club members for a product with a specified price.
 *
 * @param price - The price of the product.
 *
 * @param href - The href of the anchor element.
 *
 * @returns An anchor element with a "Oferty dla Klubowiczów IKEA Family" tag, a message about the savings available, and an AvatarIcon.
 */
export default function ClubInfoDiscount({ price, href }: ClubInfoDiscountPropsType) {
  // Calculate the savings using the getClubDiscount function
  const savingsMath = getClubDiscount(price);
  // Format the savings as a string in the Polish locale
  const formattedSavings = savingsMath.toLocaleString("pl-PL");

  // If the savings is an integer, add ",-" to the end, otherwise leave it as is
  const savings = Number.isInteger(savingsMath) ? `${formattedSavings},-` : `${formattedSavings}`;

  return (
    <a
      href={href}
      className="club-info-discount"
    >
      <div className="club-info-discount__text-wrapper">
        <Tag variant="blue">Oferty dla Klubowiczów IKEA Family</Tag>
        <strong>Dołącz lub zaloguj się i zaoszczędź {savings}</strong>
      </div>

      <div className="club-info-discount__icon-wrapper">
        <AvatarIcon />
      </div>
    </a>
  );
}
