// Icons
import RatingStarIcon from "../../Icons/RatingStarIcon";
import RatingStarHalfIcon from "../../Icons/RatingStarHalfIcon";
// Style
import "./index.scss";

type RatingType = {
  rate: number;
  quantity: number;
};

export default function RatingBlock({ rating }: { rating: RatingType }) {
  return (
    <div className="product-ratings">
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
        (<span>{rating?.quantity}</span>)
      </span>
    </div>
  );
}
