// Hooks
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath";
// Types
import { ModalDataType } from "../../../../context/ModalContext";
// Utils
import { getThumbnailsData } from "../../../../utils/getThumbnailsData";

export default function ChooseColor({ data }: { data: ModalDataType }) {
  const { variants } = data.productData;

  const location = useCurrentProductPath(data.path);

  return (
    <>
      {variants.map((productVariant, index) => {
        const { href, imgSrc, imgSrcSet, imgAlt } = getThumbnailsData(
          data.productData,
          data.path,
          productVariant,
          index
        );

        const Element = location === href ? "div" : "a";

        return (
          <Element
            key={productVariant}
            href={Element === "a" ? href : undefined}
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={imgAlt}
            />
            <span>{productVariant}</span>
          </Element>
        );
      })}
    </>
  );
}
