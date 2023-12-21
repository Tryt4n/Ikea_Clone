// Icons
import RatingStarIcon from "../../../Icons/RatingStarIcon";
import RatingStarHalfIcon from "../../../Icons/RatingStarHalfIcon";
// Style
import "./index.scss";

type RatingType = {
  rate: number;
  quantity: number;
};

type RatingBlockType = {
  rating: RatingType;
  longVersion?: boolean;
};

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
          } else if (index === Math.floor(currentRate) && currentRate % 1 !== 0) {
            return <RatingStarHalfIcon key={`star-half-${index}`} />;
          } else {
            return (
              <RatingStarIcon
                key={`star-empty-${index}`}
                isEmpty
              />
            );
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
