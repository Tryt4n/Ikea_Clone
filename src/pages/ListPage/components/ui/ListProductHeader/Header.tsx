// Import react dependencies
import { useState } from "react";
// Import components
import Tag from "../../../../../components/ui/Tag/Tag";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext";

// Define types for the component props
type HeaderType = {
  productLink: ShoppingCartType["productLink"]; // The link to the product.
  imgMain: ShoppingCartType["images"][number]; // The main image of the product.
  imgHover: ShoppingCartType["images"][number]; // The image of the product to be displayed on mouse hover.
  imgAlt: string; // The alt text for the product image.
  newTag: ShoppingCartType["newTag"]; // The tag for new products.
  oldPrice: ShoppingCartType["oldPrice"]; // The tag for products with a lower price.
  collection: ShoppingCartType["collection"]; // The collection to which the product belongs.
};

/**
 * Header is a functional component that receives productLink, imgMain, imgHover, imgAlt, newTag, oldPrice, and collection as props.
 * It maintains a state variable imgSrc that is initially set to imgMain.
 * It renders a header with a link to the product, an image that changes on mouse hover, tags for new products and products with a lower price, and the product collection.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.productLink - The link to the product.
 * @param {string} props.imgMain - The main image of the product.
 * @param {string} props.imgHover - The image of the product to be displayed on mouse hover.
 * @param {string} props.imgAlt - The alt text for the product image.
 * @param {Object} props.newTag - The tag for new products.
 * @param {Object} props.oldPrice - The tag for products with a lower price.
 * @param {string} props.collection - The collection to which the product belongs.
 *
 * @returns {JSX.Element} A header with a link to the product, an image that changes on mouse hover, tags for new products and products with a lower price, and the product collection.
 */

export function Header({
  productLink,
  imgMain,
  imgHover,
  imgAlt,
  newTag,
  oldPrice,
  collection,
}: HeaderType) {
  const [imgSrc, setImgSrc] = useState(imgMain); // Declare a state variable imgSrc that is initially set to imgMain.

  // setImg is a function that sets the imgSrc state variable to the passed image.
  function setImg(img: HeaderType["imgHover"]) {
    if (!imgHover) return;

    setImgSrc(img);
  }

  // Convert the product link to lowercase and replace special characters.
  const link = productLink.toLowerCase().replace("ä", "a").replace("å", "a");

  // The component returns a header with a link to the product, an image that changes on mouse hover, tags for new products and products with a lower price if they exist, and the product collection.
  return (
    <header className="list-product__header-wrapper">
      <a href={link}>
        <figure>
          <div
            className="list-product__img-wrapper"
            onMouseEnter={() => setImg(imgHover)}
            onMouseLeave={() => setImg(imgMain)}
          >
            <img
              src={imgSrc}
              alt={imgAlt}
              loading="lazy"
            />
          </div>

          {/* If the newTag prop exist, the component renders the newTag. */}
          {newTag && <Tag variant={newTag.variant}>Nowość</Tag>}

          {/* If the oldPrice prop exist, the component renders the oldPrice. */}
          {oldPrice && <Tag variant={oldPrice.variant}>Nowa niższa cena</Tag>}

          <figcaption className="list-product__header">{collection}</figcaption>
        </figure>
      </a>
    </header>
  );
}
