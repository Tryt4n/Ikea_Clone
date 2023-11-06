// react-router-dom
import { Link } from "react-router-dom";
// Hooks
import useProduct from "../../../../pages/ProductPage/context/useProduct";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Style
import "./index.scss";

export default function ThumbnailsImagesContainer({ data }: { data: ProductDataType }) {
  const { path, setDisplayedMainImg } = useProduct();

  const {
    variant,
    variants,
    variantsName,
    nameToDisplay,
    relatedProducts,
    name,
    thumbnails,
    collection,
    size,
    images,
  } = data;

  return (
    <div className="product-thumbnails">
      {variants.map((productVariant, index) => {
        const href =
          relatedProducts?.variants &&
          `/products/${path.collection}/${path.product}/${productVariant}/${
            relatedProducts.variants[Object.keys(relatedProducts.variants)[index]]
          }`;
        const URL = `https://www.ikea.com/pl/pl/images/products/${
          path.collection
        }-${name}-${productVariant}__${thumbnails[Object.keys(thumbnails)[index]]}`;
        const imgSrc = `${URL}?f=xu`;
        const imgSrcSet = `${URL}?f=u 2x, ${URL}?f=xu`;
        const imgAlt = `${collection} ${nameToDisplay}, ${variantsName[index]}${
          size !== "universal" ? `, ${size}` : ""
        }`;

        return (
          <Link
            key={productVariant}
            className={`product-thumbnails__link${variant === productVariant ? ` active` : ""}`}
            to={href && path.type !== productVariant ? href : ""}
            onMouseEnter={() =>
              setDisplayedMainImg({
                src: imgSrc.replace("?f=xu", ""),
                variant: variantsName[index],
              })
            }
            onMouseLeave={() =>
              setDisplayedMainImg({
                src: `https://www.ikea.com/pl/pl/images/products/${path.collection}-${name}-${variant}__${images.main}`,
                variant: path.type ? path.type : variant,
              })
            }
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={imgAlt}
              loading="lazy"
            />
            <span className="visually-hidden">{variantsName[index]}</span>
          </Link>
        );
      })}
    </div>
  );
}
