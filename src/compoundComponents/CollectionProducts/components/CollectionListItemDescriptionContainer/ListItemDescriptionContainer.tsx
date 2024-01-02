// Import custom hooks
import useCollection from "../../hooks/useCollection";
// Import types
import type { ReactNode } from "react";
import type { ListItemDescriptionPlacementTypes } from "../../../../types/collectionTypes";
// Import icons
import ChevronRightIcon from "../../../../Icons/ChevronRightIcon";

// Define the type for the ListItemDescriptionContainer props
type ListItemDescriptionContainerPropsType = {
  children: ReactNode; // The elements that this component will wrap around
  className?: string; // Optional string that determines the CSS class of the component
  id: string; // The ID of the component
  linkToProduct: string; // The link to the product
  placement: ListItemDescriptionPlacementTypes; // The placement of the list item description
};

/**
 * ListItemDescriptionContainer component
 *
 * This component wraps around its children and applies CSS classes and an ID to itself.
 * It also contains a link to a product.
 * When the item description is visible and the hovered item ID is the same as the component's ID, it sets the tabIndex to 0 and aria-hidden to "false".
 * When the link is blurred or the mouse leaves the link, it sets the description menu visibility to false.
 *
 * @param children - The elements that this component will wrap around.
 * @param className - Optional string that determines the CSS class of the component.
 * @param id - The ID of the component.
 * @param linkToProduct - The link to the product.
 * @param placement - The placement of the list item description.
 *
 * @returns A div component with the specified CSS classes, ID, and children, and a link to the specified product. When the item description is visible and the hovered item ID is the same as the component's ID, it sets the tabIndex to 0 and aria-hidden to "false". When the link is blurred or the mouse leaves the link, it sets the description menu visibility to false.
 */

export function ListItemDescriptionContainer({
  children,
  className,
  id,
  linkToProduct,
  placement,
}: ListItemDescriptionContainerPropsType) {
  const { isDescriptionMenuVisible, hoveredItemID, setIsDescriptionMenuVisible } = useCollection(); // Get the isDescriptionMenuVisible, hoveredItemID, and setIsDescriptionMenuVisible functions from the CollectionContext

  // Define the condition for the item description visibility
  const visibilityCondition = hoveredItemID === id && isDescriptionMenuVisible;

  // Define the CSS classes of the item description
  const itemDescriptionClasses = `collection-list__item-description-container ${placement}`;

  return (
    <div
      id={id} // Set the ID to the specified ID
      className={`${itemDescriptionClasses}${className ? ` ${className}` : ""}`} // Set the CSS classes to the specified classes
      role="tooltip" // Set the role to "tooltip"
      aria-hidden={visibilityCondition ? "false" : "true"} // If the visibility condition is met, set aria-hidden to "false", otherwise set it to "true"
    >
      <a
        href={linkToProduct} // Set the href to the link to the product
        className="collection-list__item-description-link"
        tabIndex={visibilityCondition ? 0 : -1} // If the visibility condition is met, set tabIndex to 0, otherwise set it to -1
        onBlur={() => setIsDescriptionMenuVisible(false)} // When the link is blurred, set the description menu visibility to false
        onMouseLeave={() => setIsDescriptionMenuVisible(false)} // When the mouse leaves the link, set the description menu visibility to false
      >
        <div className="collection-list__item-description-inner-wrapper">{children}</div>
        <ChevronRightIcon />
      </a>
    </div>
  );
}
