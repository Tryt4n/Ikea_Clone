// Importing types
import type { Params } from "react-router";
import type { ProductDataType } from "../pages/ProductPage/types/ProductDataType";
// Importing constants
import { productLink } from "../constants/links";

/**
 * getThumbnailsData function
 *
 * This function generates the data for the thumbnails of a product.
 *
 * @param data - The product data.
 * @param path - The path parameters.
 * @param productVariant - The product variant.
 * @param index - The index of the thumbnail.
 *
 * @returns An object containing the href for the thumbnail, the src for the thumbnail image, the srcset for the thumbnail image, and the alt text for the thumbnail image.
 */
export function getThumbnailsData(
  data: ProductDataType,
  path: Readonly<Params<string>>,
  productVariant: string,
  index: number,
) {
  // Destructure the necessary data from the product data
  const {
    relatedProducts,
    thumbnails,
    collection,
    nameToDisplay,
    variantsName,
    size,
  } = data;

  // Define the href for the thumbnail
  const href =
    relatedProducts?.variants &&
    `/products/${path.collection}/${path.product}/${productVariant}/${
      relatedProducts.variants[Object.keys(relatedProducts.variants)[index]]
    }`;

  // Define the URL for the thumbnail image
  const URL = `${productLink}/${path.collection}-${data.name}-${productVariant}__${
    thumbnails[Object.keys(thumbnails)[index]]
  }`;

  // Define the src for the thumbnail image
  const imgSrc = `${URL}?f=xu`;

  // Define the srcset for the thumbnail image
  const imgSrcSet = `${URL}?f=u 2x, ${URL}?f=xu`;

  // Define the alt text for the thumbnail image
  const imgAlt = `${collection} ${nameToDisplay}, ${variantsName[index]}${
    size !== "universal" ? `, ${size}` : ""
  }`;

  // Return the thumbnail data
  return { href, imgSrc, imgSrcSet, imgAlt };
}
