// Importing necessary types from React
import type { ImgHTMLAttributes } from "react";
// Importing the type for aspect ratios
import type { AspectRatioType } from "../../../../types/articleTypes";

// Defining the type for the props of the Img component
type ImgPropsType = {
  // The aspectRatio prop is an optional string that can be used to specify an aspect ratio for the Img component
  aspectRatio?: AspectRatioType;
  // The aspectRatioMobile prop is an optional string that can be used to specify a mobile aspect ratio for the Img component
  aspectRatioMobile?: AspectRatioType;
  // The ImgHTMLAttributes<HTMLImageElement> type is used to allow all standard HTML image element properties to be passed to the Img component
} & ImgHTMLAttributes<HTMLImageElement>;

/**
 * Img component
 *
 * This component is a wrapper for an image element with the class of "aspect-ratio-{aspectRatio}" and optionally "mobile-aspect-ratio-{aspectRatioMobile}".
 * It accepts aspectRatio and aspectRatioMobile props to specify the aspect ratios.
 * All standard HTML image element properties can also be passed.
 *
 * @param aspectRatio - The aspect ratio for the Img component. Defaults to "16/9".
 * @param aspectRatioMobile - The mobile aspect ratio for the Img component.
 * @param props - The standard HTML image element properties to be added to the Img component.
 *
 * @returns An image element with the class of "aspect-ratio-{aspectRatio}" and optionally "mobile-aspect-ratio-{aspectRatioMobile}", and the "loading" attribute set to "lazy".
 */

export function Img({ aspectRatio = "16/9", aspectRatioMobile, ...props }: ImgPropsType) {
  // The aspect ratios are formatted by replacing "/" with "-"
  const formattedAspectRatio = aspectRatio.replace("/", "-");
  const formattedAspectRatioMobile = aspectRatioMobile ? aspectRatioMobile.replace("/", "-") : "";

  // The imgClassNames variable is set to the formatted aspect ratio classes
  const imgClassNames = `aspect-ratio-${formattedAspectRatio}${
    formattedAspectRatioMobile ? ` mobile-aspect-ratio-${formattedAspectRatioMobile}` : ""
  }`;

  return (
    <img
      {...props}
      loading="lazy" // The "loading" attribute is set to "lazy" to enable lazy loading
      className={imgClassNames}
    />
  );
}
