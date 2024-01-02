// Import custom hooks
import useCollection from "../../hooks/useCollection";
// Import types
import type { CSSProperties, HTMLProps, ReactNode } from "react";

// Define the type for the CollectionListItem props
type CollectionListItemPropsType = {
  children: ReactNode; // The elements that this component will wrap around
  top?: string; // Optional string that determines the CSS top property of the component
  bottom?: string; // Optional string that determines the CSS bottom property of the component
  left?: string; // Optional string that determines the CSS left property of the component
  right?: string; // Optional string that determines the CSS right property of the component
  descriptionContainerId: string; // The ID of the description container
} & HTMLProps<HTMLLIElement>; // This allows the component to accept all properties that a regular list item would accept

/**
 * CollectionListItem component
 *
 * This component wraps around its children and applies CSS position properties to itself.
 * When focused or hovered, it shows the item description.
 *
 * @param children - The elements that this component will wrap around.
 * @param top - Optional string that determines the CSS top property of the component.
 * @param bottom - Optional string that determines the CSS bottom property of the component.
 * @param left - Optional string that determines the CSS left property of the component.
 * @param right - Optional string that determines the CSS right property of the component.
 * @param descriptionContainerId - The ID of the description container.
 *
 * @returns A list item component with the specified CSS position properties, a "collection-list__item" class, and the provided children. When focused or hovered, it shows the item description.
 */

export function CollectionListItem({
  children,
  top,
  bottom,
  left,
  right,
  descriptionContainerId,
}: CollectionListItemPropsType) {
  const { setIsDescriptionMenuVisible, setHoveredItemID } = useCollection(); // Get the setIsDescriptionMenuVisible and setHoveredItemID functions from the CollectionContext

  // Define the CSS properties of the list item
  const listItemStyle: CSSProperties = {
    top: top ? top : "auto",
    bottom: bottom ? bottom : "auto",
    left: left ? left : "auto",
    right: right ? right : "auto",
  };

  // Define the function that shows the item description
  function showItemDescription() {
    setIsDescriptionMenuVisible(true); // Set the description menu to visible
    setHoveredItemID(descriptionContainerId); // Set the hovered item ID to the description container ID
  }

  return (
    <li
      style={listItemStyle} // Set the CSS properties
      onFocus={showItemDescription} // When focused, show the item description
      onMouseEnter={showItemDescription} // When hovered, show the item description
    >
      <span className="visually-hidden">Idź na stronę produktu</span>

      <button
        className="collection-list__item"
        aria-controls={descriptionContainerId} // Set the aria-controls to the description container ID for accessibility
        aria-labelledby={descriptionContainerId} // Set the aria-labelledby to the description container ID for accessibility
      >
        <span className="visually-hidden">Pokaż informacje o produkcie</span>
      </button>

      {children}
    </li>
  );
}
