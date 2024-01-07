// Import components
import { ProductControls } from "../../ui/ProductItemControls/ProductControls";
import { ProductDescription } from "../../ui/ProductItemDescription/ProductDescription";
import { ProductHeader } from "../../ui/ProductItemHeader/ProductHeader";
import { ProductImgButton } from "../../ui/ProductItemImgButton/ProductImgButton";
// Import constants
import { productLink as imageLink } from "../../../../../constants/links";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/types/ShoppingCartType";
// Import styles
import "./index.scss";

/**
 * ProductItem is a functional component that takes in a product as a prop.
 * It destructures the product prop to get various properties related to the product.
 * It constructs the product image source URL using the imageLink constant and the product's properties.
 * It renders a list item containing a ProductImgButton component, a product number, a ProductHeader component, a ProductDescription component, and a ProductControls component.
 *
 * @param {object} product The product passed to the ProductItem component.
 * @returns {JSX.Element} A list item containing various components related to the product.
 */

export default function ProductItem({ product }: { product: ShoppingCartType }) {
  const {
    collection,
    images,
    name,
    nameToDisplay,
    price,
    productNumber,
    quantity,
    size,
    variant,
    variantName,
    oldPrice,
    productLink,
  } = product;

  // Construct the product image source URL.
  const productImgSrc = `${imageLink}/${collection.toLowerCase()}-${name}-${variant}__${
    images.main
  }`;

  return (
    <li className="shopping-cart-product-item">
      <div className="shopping-cart-product-item__img-wrapper">
        {/* Render a ProductImgButton component with the product and the product image source URL as props. */}
        <ProductImgButton
          product={product}
          src={productImgSrc}
        />

        {/* Render the product number. */}
        <small className="shopping-cart-product-item__product-number">
          <span className="visually-hidden">Numer produktu:</span>
          {productNumber}
        </small>
      </div>

      <section className="shopping-cart-product-item__text-container">
        {/* Render a ProductHeader component with various product properties as props. */}
        <ProductHeader
          collection={collection}
          variant={oldPrice?.variant}
          price={price}
          productLink={productLink}
          quantity={quantity}
        />

        {/* Render a ProductDescription component with various product properties as props. */}
        <ProductDescription
          nameToDisplay={nameToDisplay}
          oldPrice={oldPrice}
          price={price}
          quantity={quantity}
          size={size}
          variantName={variantName}
        />

        {/* Render a ProductControls component with the product and the quantity as props. */}
        <ProductControls
          quantity={quantity}
          product={product}
        />
      </section>
    </li>
  );
}
