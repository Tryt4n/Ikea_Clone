// Types
import { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function ProductInformations({ data }: { data: ProductDataType }) {
  return (
    <div className="product-information">
      <div className="product-information__description-container">
        <p className="product-information__description">{data.description}</p>
        <small className="product-information__product-number-wrapper">
          <span>Numer artykułu</span>
          <span className="product-information__product-number">{data.productNumber}</span>
        </small>
      </div>
    </div>
  );
}
