// React
import React from "react";
// Custom Hooks
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath";
// Types
import type { ModalDataChooseColorType } from "../../types/ModalTypes";
// Utils
import { getThumbnailsData } from "../../../../utils/getThumbnailsData";

export default function ChooseColor({ data }: { data: ModalDataChooseColorType }) {
  const { variants, variantsName } = data.productData;

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
            className="variant-item variant-item__color"
            aria-label={Element === "div" ? "Obecnie wybrany kolor" : undefined}
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={imgAlt}
            />
            <VariantText text={variantsName[variants.indexOf(productVariant)]} />
          </Element>
        );
      })}
    </>
  );
}

function VariantText({ text }: { text: string }) {
  const wrappedText = text.split("/").map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 && (
        <>
          /
          <wbr />
        </>
      )}
      {part}
    </React.Fragment>
  ));

  return <span>{wrappedText}</span>;
}
