// Custom Hooks
import useProduct from "../../../../pages/ProductPage/context/useProduct";
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath";
// Types
import { ProductDataType } from "../../types/ProductDataType";
// Utils
import { getThumbnailsData } from "../../../../utils/getThumbnailsData";
// Constants
import { productLink } from "../../../../constants/links";
// Style
import "./index.scss";
import Btn from "../../../../components/Btn/Btn";

type ThumbnailsImagesContainerPropsType = {
  data: ProductDataType;
  openModal: (data: ProductDataType) => void;
};

export default function ThumbnailsImagesContainer({
  data,
  openModal,
}: ThumbnailsImagesContainerPropsType) {
  const { path, setDisplayedMainImg } = useProduct();
  const location = useCurrentProductPath(path);

  const { variant, variants, variantsName, name, images } = data;

  const maxVisibleThumbnails = 7;

  return (
    <div className="product-thumbnails">
      {variants.slice(0, maxVisibleThumbnails).map((productVariant, index) => {
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
                src: `${productLink}/${path.collection}-${name}-${variant}__${images.main}`,
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

      {variants.length > maxVisibleThumbnails && (
        <Btn
          variant="light-with-border"
          shape="circle"
          className="product-thumbnails__remaining-thumbnails-count"
          aria-label={`Dostępne są jeszcze ${variants.length - maxVisibleThumbnails} warianty`}
          onClick={() => openModal(data)}
        >
          +{variants.length - maxVisibleThumbnails}
        </Btn>
      )}
    </div>
  );
}
