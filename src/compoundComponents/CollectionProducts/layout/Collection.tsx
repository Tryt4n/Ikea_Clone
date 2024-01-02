// Import types
import type { HTMLProps, ReactNode } from "react";
// Import context provider
import { CollectionContextProvider } from "../context/CollectionProductsContext";
// Import child components
import { CollectionListItem } from "../components/CollectionListItem/ListItem";
import { ListItemDescriptionContainer } from "../components/CollectionListItemDescriptionContainer/ListItemDescriptionContainer";
import { ListItemHeadingContainer } from "../components/CollectionListItemHeading/ListItemHeadingContainer";
import { ListItemHeading } from "../components/CollectionListItemHeading/ListItemHeading";
import { ListItemSubHeading } from "../components/CollectionListItemHeading/ListItemSubHeading";
import { ListItemPrice } from "../components/CollectionListItemPrice/ListItemPrice";
import { ListItemTag } from "../components/CollectionListItemTag/ListItemTag";
import { ListItemLastPriceDescription } from "../components/CollectionListItemLastPriceDescription/ListItemLastPriceDescription";
// Import styles
import "../index.scss";

// Define the Collection component props
type CollectionListPropsType = {
  children: ReactNode; // The elements that this component will wrap around
  showOnlyOnHover?: boolean; // Optional boolean that determines whether the component should only be shown on hover
} & HTMLProps<HTMLUListElement>; // Include all properties that a regular unordered list would accept

/**
 * Collection component
 *
 * This component wraps around its children and provides them with the CollectionContext.
 * It can optionally only be shown on hover.
 *
 * @param children - The elements that this component will wrap around.
 * @param showOnlyOnHover - Optional boolean that determines whether the component should only be shown on hover.
 *
 * @returns A CollectionContextProvider that wraps around an unordered list with a "collection-list" class and the provided children. The unordered list can optionally only be shown on hover.
 */

export default function Collection({ children, showOnlyOnHover }: CollectionListPropsType) {
  return (
    <CollectionContextProvider>
      <ul
        className={`collection-list${showOnlyOnHover ? ` show-only-on-hover` : ""}`}
        aria-label="Produkty ze zdjęcia"
      >
        {children}
      </ul>
    </CollectionContextProvider>
  );
}

// Assigning the imported components as subcomponents of the Collection component
Collection.ListItem = CollectionListItem;
Collection.ListItemDescriptionContainer = ListItemDescriptionContainer;
Collection.ListItemHeadingContainer = ListItemHeadingContainer;
Collection.ListItemHeading = ListItemHeading;
Collection.ListItemSubHeading = ListItemSubHeading;
Collection.ListItemPrice = ListItemPrice;
Collection.ListItemTag = ListItemTag;
Collection.ListItemLastPriceDescription = ListItemLastPriceDescription;
