// Import styles
import "./index.scss";

// Define the prop types for the component
type SummaryPropsType = {
  description: string; // The description of the product.
  productNumber: string; // The product number of the product.
};

/**
 * Summary Component
 *
 * This is a React functional component. It displays the description and product number of a product.
 *
 * @component
 * @param {string} description - The description of the product.
 * @param {string} props.productNumber - The product number of the product.
 *
 * @example
 * <Summary description="This is a product description." productNumber="123.456.78" />
 *
 * @returns A JSX element that consists of a `div` with the class name `product-summary__description-container`. Inside this `div`, it renders a `p` element that displays the `description` prop, and a `small` element that contains two `span` elements. The first `span` displays the text "Numer artykułu", and the second `span` displays the `productNumber` prop.
 */

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
