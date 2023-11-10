// Hooks
import useProduct from "../../../../pages/ProductPage/context/useProduct";
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Utils
import { getThumbnailsData } from "../../../../utils/getThumbnailsData";
// Style
import "./index.scss";

export default function ThumbnailsImagesContainer({ data }: { data: ProductDataType }) {
  const { path, setDisplayedMainImg } = useProduct();
  const location = useCurrentProductPath(path);

  const { variant, variants, variantsName, name, images } = data;

  return (
    <div className="product-thumbnails">
      {variants.map((productVariant, index) => {
        const { href, imgSrc, imgSrcSet, imgAlt } = getThumbnailsData(
          data,
          path,
          productVariant,
          index
        );

        const Element = location === href ? "div" : "a";

        return (
          <Element
            key={productVariant}
            className={`product-thumbnails__link${variant === productVariant ? ` active` : ""}`}
            href={Element === "a" ? href : undefined}
            aria-label={Element === "div" ? "Aktualnie wybrany wariant" : undefined}
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
          </Element>
        );
      })}
    </div>
  );
}
