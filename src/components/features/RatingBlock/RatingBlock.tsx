// Import icons
import RatingStarIcon from "../../../Icons/RatingStarIcon";
import RatingStarHalfIcon from "../../../Icons/RatingStarHalfIcon";
// Import styles
import "./index.scss";

// Defining the type for the rating
type RatingType = {
  rate: number; // The rating score
  quantity: number; // The number of ratings
};

// Defining the type for the RatingBlock props
type RatingBlockType = {
  rating: RatingType; // The rating
  longVersion?: boolean; // A flag indicating if the long version of the rating should be displayed
};

/**
 * RatingBlock Component
 *
 * This component displays a rating block with stars and the number of ratings.
 *
 * @param rating - The rating.
 * @param longVersion - A flag indicating if the long version of the rating should be displayed.
 *
 * @returns A div element with a class of "product-ratings", containing a strong element with a class of "visually-hidden" and the rating score, a span element with a class of "visually-hidden" and the text "Liczba ocen:" for accessibility, a span element with a class of "product-ratings__wrapper" and the rating stars, and a span element with a class of "product-ratings__text" and the number of ratings for visual effect.
 */
export default function RatingBlock({ rating, longVersion }: RatingBlockType) {
  return (
    <div className="product-ratings">
      <strong className="visually-hidden">Ocena: {rating.rate}</strong>
      <span className="visually-hidden">Liczba ocen:</span>
      <span className="product-ratings__wrapper">
        {[...Array(5)].map((_, index) => {
          const currentRate = rating?.rate || 0;
          if (index < Math.floor(currentRate)) {
            return <RatingStarIcon key={`star-${index}`} />;
          } else if (
            index === Math.floor(currentRate) &&
            currentRate % 1 !== 0
          ) {
            return <RatingStarHalfIcon key={`star-half-${index}`} />;
          } else {
            return <RatingStarIcon key={`star-empty-${index}`} isEmpty />;
          }
        })}
      </span>
      <span className="product-ratings__text">
        <span aria-hidden="true">(</span>
        <span className="product-ratings__rate">
          {rating?.quantity}
          {longVersion ? " recenzji" : ""}
        </span>
        <span aria-hidden="true">)</span>
      </span>
    </div>
  );
}
