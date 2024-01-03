// Import components
import Tag from "../../../../../components/ui/Tag/Tag";
// Import helpers functions
import { calculatePrice } from "../../../../../utils/calculatePrice";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext";
import type { TextVariants } from "../../../../../types/colorsVariantsType";

// Define the ProductHeaderPropsType props type.
type ProductHeaderPropsType = {
  variant?: TextVariants; // The variant of the Tag component.
  productLink: ShoppingCartType["productLink"]; // The link to the product.
  collection: ShoppingCartType["collection"]; // The collection of the product.
  price: ShoppingCartType["price"]; // The price of the product.
  quantity: ShoppingCartType["quantity"]; // The quantity of the product.
};

/**
 * ProductHeader is a functional component that takes in several props related to a product.
 * It renders a header containing a Tag component (if a variant is provided), a heading with a link to the product, and the calculated price of the product.
 *
 * @param {TextVariants} variant The variant of the Tag component.
 * @param {string} props.productLink The link to the product.
 * @param {string} props.collection The collection of the product.
 * @param {object} props.price The price of the product.
 * @param {number} props.quantity The quantity of the product.
 * @returns {JSX.Element} A header containing a Tag component (if a variant is provided), a heading with a link to the product, and the calculated price of the product.
 */

export function ProductHeader({
  variant,
  productLink,
  collection,
  price,
  quantity,
}: ProductHeaderPropsType) {
  return (
    <header className="shopping-cart-product-item__header-wrapper">
      <div>
        {/* If a variant is provided, render a Tag component with the variant and a custom class. */}
        {variant && (
          <Tag
            variant={variant}
            className="shopping-cart-product-item__tag"
          >
            Nowa niższa cena
          </Tag>
        )}

        {/* Render a heading with a link to the product. */}
        <h3>
          <a href={productLink}>{collection}</a>
        </h3>
      </div>

      {/* Render the calculated price of the product. */}
      <strong>{calculatePrice(quantity, price.integer, price.decimal)}</strong>
    </header>
  );
}
