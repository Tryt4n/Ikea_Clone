import "./index.scss";

type SummaryPropsType = {
  description: string;
  productNumber: string;
};

export default function Summary({ description, productNumber }: SummaryPropsType) {
  return (
    <div className="product-summary__description-container">
      <p className="product-summary__description">{description}</p>
      <small className="product-summary__product-number-wrapper">
        <span>Numer artykułu</span>
        <span className="product-summary__product-number">{productNumber}</span>
      </small>
    </div>
  );
}
