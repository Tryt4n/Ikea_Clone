// Importing necessary types from React
import type { ReactNode } from "react";
// Importing the type for background color variants
import type { BackgroundVariants } from "../../../../types/colorsVariantsType";

// Defining the type for the props of the TextContainer component
type TextContainerPropsType = {
  // The children prop is used to pass React elements to be rendered inside the TextContainer component
  children: ReactNode;
  // The variant prop is an optional string that can be used to specify a background color variant for the TextContainer component
  variant?: BackgroundVariants;
};

/**
 * TextContainer component
 *
 * This component is a wrapper for a div element with the class of "article__text-container".
 * It accepts a variant prop to specify a background color variant.
 *
 * @param children - The React elements to be rendered inside the TextContainer component.
 * @param variant - The background color variant for the TextContainer component.
 *
 * @returns A div element with the class of "article__text-container" and a background color variant class if specified, containing the passed children.
 */
export function TextContainer({ children, variant }: TextContainerPropsType) {
  return (
    <div className={`article__text-container${variant ? ` bg-${variant}` : ""}`}>{children}</div>
  );
}
