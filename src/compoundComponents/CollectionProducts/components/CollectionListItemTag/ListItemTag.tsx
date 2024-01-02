// Import types
import type { TextVariants } from "../../../../types/colorsVariantsType";

// Define the type for the ListItemTag props
type ListItemTagPropsType = {
  children: string; // The text that this component will display
  className?: string; // Optional string that determines the CSS class of the component
  variant?: TextVariants; // Optional variant of the text
};

/**
 * ListItemTag component
 *
 * This component displays a text with a specified variant and CSS class.
 *
 * @param children - The text that this component will display.
 * @param className - Optional string that determines the CSS class of the component.
 * @param variant - Optional variant of the text.
 *
 * @returns An em element with the specified text, a "collection-list__item-tag" class, and optionally a variant and a CSS class.
 */

export function ListItemTag({ children, className, variant }: ListItemTagPropsType) {
  const emClasses = `collection-list__item-tag${variant ? ` tx-${variant}` : ""}${
    className ? ` ${className}` : ""
  }`; // Define the CSS classes of the em element

  return <em className={emClasses}>{children}</em>;
}
