// Import types
import type { HTMLAttributes } from "react";

// Define the type for the Heading props
type HeadingPropsType = {
  headingLevel?: 2 | 3 | 4 | 5 | 6; // Optional number that determines the heading level, defaults to 2
} & HTMLAttributes<HTMLHeadingElement>; // This allows the component to accept all properties that a regular heading would accept

/**
 * Heading component
 *
 * This component renders a heading with a specified level.
 * If no level is provided, it defaults to 2 (h2).
 *
 * @param children - The elements that this component will wrap around.
 * @param headingLevel - Optional number that determines the heading level, defaults to 2.
 * @param props - Any additional props to pass to the heading component.
 *
 * @returns A heading component with the specified level, and the provided children.
 */

export function Heading({
  children,
  headingLevel,
  ...props
}: HeadingPropsType) {
  const Element = headingLevel ? `h${headingLevel}` : "h2"; // Determine the heading level

  return <Element {...props}>{children}</Element>; // Render the heading with the specified level and children
}
