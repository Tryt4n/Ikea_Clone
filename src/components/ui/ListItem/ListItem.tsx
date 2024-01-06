// React
import { ReactNode } from "react";

// Define the type for the ListItem props
type ListItemPropsType = {
  as?: "a" | "button"; // The HTML element to use for the list item content, defaults to "a"
  link?: string; // The href for the "a" element, defaults to "#"
  className?: string; // Optional additional CSS classes
  children: ReactNode; // The content of the list item
  onClickFunction?: () => void; // Optional click handler function
};

/**
 * ListItem component
 *
 * This component displays a list item with content that can be either a link or a button.
 *
 * @param as - The HTML element to use for the list item content. Defaults to "a".
 * @param link - The href for the "a" element.
 * @param children - The content of the list item.
 * @param className - Optional additional CSS classes.
 * @param onClickFunction - Optional click handler function.
 *
 * @returns A list item element containing either a link or a button with the provided content.
 */
export default function ListItem({
  as = "a",
  link = "#",
  children,
  className,
  onClickFunction,
}: ListItemPropsType) {
  const Element = as; // Use the 'as' prop to determine the type of the content element

  return (
    <li
      className={className ? className : undefined} // Set the CSS class if provided
    >
      <Element
        href={as === "a" ? link : undefined} // Set the href if the content element is a link
        onClick={onClickFunction} // Set the click handler if provided
      >
        {children}
      </Element>
    </li>
  );
}
