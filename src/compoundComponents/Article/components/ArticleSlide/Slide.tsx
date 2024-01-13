// Importing necessary types from React
import type { ReactNode } from "react";
// Importing the type for background variants
import type { BackgroundVariants } from "../../../../types/colorsVariantsType";

// Defining the type for the props of the Slide component
type SlidePropsType = {
  // The children prop is used to pass React elements to be rendered inside the Slide component
  children: ReactNode;
  // The className prop is an optional string that can be used to add additional CSS classes to the Slide component
  className?: string;
  // The variant prop is an optional string that can be used to specify a background variant for the Slide component
  variant?: BackgroundVariants;
};

/**
 * Slide component
 *
 * This component is a wrapper for a div element with the class of "article__slide" and optionally "bg-{variant}" and additional CSS classes.
 * It accepts a children prop which should be a ReactNode, and optional className and variant props.
 *
 * @param children - The React elements to be rendered inside the Slide component.
 * @param variant - The background variant for the Slide component.
 * @param className - The additional CSS classes to add to the Slide component.
 * @param props - The additional properties to be added to the Slide component.
 *
 * @returns A div element with the class of "article__slide" and optionally "bg-{variant}" and additional CSS classes, containing the passed React elements.
 */

export function Slide({
  children,
  variant,
  className,
  ...props
}: SlidePropsType) {
  const styles = `article__slide${variant ? ` bg-${variant}` : ""}${
    className ? ` ${className}` : ""
  }`;

  return (
    <div className={styles} {...props} data-testid="article-slide">
      {children}
    </div>
  );
}
