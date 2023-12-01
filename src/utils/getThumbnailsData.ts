// react-router-dom
import { Params } from "react-router";
// Types
import type { ProductDataType } from "../pages/ProductPage/types/ProductDataType";
// Constants
import { productLink } from "../constants/links";

export function getThumbnailsData(
  data: ProductDataType,
  path: Readonly<Params<string>>,
  productVariant: string,
  index: number
) {
  const { relatedProducts, thumbnails, collection, nameToDisplay, variantsName, size } = data;

  const href =
    relatedProducts?.variants &&
    `/products/${path.collection}/${path.product}/${productVariant}/${
      relatedProducts.variants[Object.keys(relatedProducts.variants)[index]]
    }`;
  const URL = `${productLink}/${path.collection}-${data.name}-${productVariant}__${
    thumbnails[Object.keys(thumbnails)[index]]
  }`;
  const imgSrc = `${URL}?f=xu`;
  const imgSrcSet = `${URL}?f=u 2x, ${URL}?f=xu`;
  const imgAlt = `${collection} ${nameToDisplay}, ${variantsName[index]}${
    size !== "universal" ? `, ${size}` : ""
  }`;

  return { href, imgSrc, imgSrcSet, imgAlt };
}
