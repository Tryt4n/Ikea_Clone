// Import react dependencies
import React from "react";
// Import custom hooks
import useCurrentProductPath from "../../../../hooks/useCurrentProductPath/useCurrentProductPath";
// Import types
import type { ModalDataChooseColorType } from "../../types/ModalTypes";
// Import utils functions
import { getThumbnailsData } from "../../../../utils/getThumbnailsData";

/**
 * ChooseColor is a React component that renders a list of color variants for a product.
 * Each color variant is represented by an image and a text.
 * The component uses the useCurrentProductPath custom hook and the getThumbnailsData utility function.
 *
 * @param {ModalDataChooseColorType} props.data - The data of the color variants.
 *
 * @example
 * <ChooseColor data={data} />
 */

export default function ChooseColor({ data }: { data: ModalDataChooseColorType }) {
  const { variants, variantsName } = data.productData; // Desctructure the variants and variantsName properties from the productData property of the data object.

  const location = useCurrentProductPath(data.path); // Use the useCurrentProductPath custom hook to get the current product path.

  return (
    <>
      {/* Map through the variants array and render a thumbnail for each variant. */}
      {variants.map((productVariant, index) => {
        const { href, imgSrc, imgSrcSet, imgAlt } = getThumbnailsData(
          data.productData,
          data.path,
          productVariant,
          index
        ); // Use the getThumbnailsData utility function to get the data of the thumbnails.

        const Element = location === href ? "div" : "a"; // If the current product path is equal to the href property, render a `div` element. Otherwise, render an `a` element.

        return (
          <Element
            key={productVariant}
            href={Element === "a" ? href : undefined} // Set href only if the Element is an `a` element.
            className="variant-item variant-item__color"
            aria-label={Element === "div" ? "Obecnie wybrany kolor" : undefined} // Set aria-label only if the variant is currently selected.
          >
            <img
              src={imgSrc}
              srcSet={imgSrcSet}
              alt={imgAlt}
            />
            <VariantText
              text={variantsName[variants.indexOf(productVariant)]} // Get the text of the color variant from the variantsName array.
            />
          </Element>
        );
      })}
    </>
  );
}

/**
 * VariantText is a React component that renders a text for a color variant.
 * The text is split by slashes and each part is wrapped in a React Fragment.
 *
 * @component
 * @param {object} props - The properties that define the text of the color variant.
 * @param {string} props.text - The text of the color variant.
 *
 * @example
 * <VariantText text="text" />
 */

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
  )); // The text of the color variant, split by slashes and each part wrapped in a React Fragment.

  return <span>{wrappedText}</span>;
}
