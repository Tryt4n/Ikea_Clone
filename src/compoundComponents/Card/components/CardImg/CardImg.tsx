// Import types
import type { ImgHTMLAttributes } from "react";

// Define a type for the CardImg props
type ImgPropsType = {
  aspectRatio?: "1/1" | "3/4"; // Optional string that determines the aspect ratio of the image, defaults to "1/1"
} & ImgHTMLAttributes<HTMLImageElement>; // This allows the component to accept all properties that a regular img would accept

/**
 * CardImg component
 *
 * This component renders an image with a specified aspect ratio.
 *
 * @param aspectRatio - Optional string that determines the aspect ratio of the image, defaults to "1/1".
 * @param props - Any additional props to pass to the img component.
 *
 * @returns An img component with a class of "aspect-ratio-3-4" if the aspectRatio is "3/4", and a loading attribute set to "lazy".
 */
export function CardImg({ aspectRatio = "1/1", ...props }: ImgPropsType) {
  return (
    <img
      {...props} // Spread the rest of the props
      className={aspectRatio === "3/4" ? "aspect-ratio-3-4" : undefined} // Set the class to "aspect-ratio-3-4" if the aspectRatio is "3/4"
      loading="lazy" // Set the loading attribute to "lazy" to defer loading of the image until it reaches a calculated distance from the viewport
    />
  );
}
