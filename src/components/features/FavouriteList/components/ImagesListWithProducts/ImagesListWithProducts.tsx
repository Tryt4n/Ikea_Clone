// Import React dependencies
import React from "react";
// Import constants
import { productLink } from "../../../../../constants/links";
// Import types
import type { ShoppingCartType } from "../../../../../context/AppContext/AppContext";

/**
 * ImagesListWithProducts Component
 *
 * This component displays a list of product images.
 *
 * @param products - The list of products.
 *
 * @returns A ul element with a class of "favourite-list__inner-list-grid_" and a number indicating the number of products (1, 2, or 3), containing li elements for each product. Each li element contains a div with a class of "favourite-list__product-image", which contains either a span indicating the number of additional products if there are more than 3 products and this is the third product, or an img element with the product image.
 */
export function ImagesListWithProducts({ products }: { products: ShoppingCartType[] }) {
  return (
    <ul
      className={`favourite-list__inner-list-grid_${
        products.length === 1 ? 1 : products.length === 2 ? 2 : 3
      }`}
    >
      {products.map((product, index) => {
        const { collection, name, variant, images, productNumber, nameToDisplay, variantName } =
          product;

        const imgSrc = `${productLink}/${collection}-${name}-${variant}__${images.main}`;

        return (
          <React.Fragment key={productNumber}>
            {index < 3 && (
              <li>
                <div className="favourite-list__product-image">
                  {index === 2 && products.length > 3 ? (
                    <span>+{products.length - index}</span>
                  ) : (
                    <img
                      src={imgSrc}
                      alt={`${collection}-${nameToDisplay} ${variantName}`}
                      loading="lazy"
                    />
                  )}
                </div>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
