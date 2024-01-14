// Import necessary types and functions
import { type ReactNode, createContext, useState } from "react";

// Define a type for the context that will be used in the CollectionContext
type CollectionContextType = {
  isDescriptionMenuVisible: boolean; // A boolean that determines whether the description menu is visible
  setIsDescriptionMenuVisible: (state: boolean) => void; // A function that sets the visibility of the description menu
  hoveredItemID: string; // A string that represents the ID of the currently hovered item
  setHoveredItemID: (id: string) => void; // A function that sets the ID of the currently hovered item
};

// Create the CollectionContext with a default value of null
export const CollectionContext = createContext<CollectionContextType | null>(
  null,
);

/**
 * CollectionContextProvider component
 *
 * This component provides the CollectionContext to its children.
 * It maintains the state of the description menu visibility and the currently hovered item ID.
 *
 * @param children - The elements that this component will wrap around.
 *
 * @returns A CollectionContext.Provider component with the current context value and the provided children.
 */

export function CollectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDescriptionMenuVisible, setIsDescriptionMenuVisible] =
    useState(false); // Initialize the state of the description menu visibility, defaults to false
  const [hoveredItemID, setHoveredItemID] = useState(""); // Initialize the state of the currently hovered item ID, defaults to an empty string

  // Define the current context value
  const contextValue = {
    isDescriptionMenuVisible,
    setIsDescriptionMenuVisible,
    hoveredItemID,
    setHoveredItemID,
  };

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
}
